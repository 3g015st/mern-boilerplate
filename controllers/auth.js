const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    // Encrypt password
    bcrypt.hash(password, 12).then(hashedPassword => {
        const user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
        });
        return user.save();
    }).then(res => {
        res.status(201).json({message: 'User successfully created!', userId: res._id});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.login = (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({email: email}).then(user => {
        if(!user){
            const error = new Error('Cannot find this user');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    }).then(isEqual => {
        if(!isEqual){
            const error = new Error('Password does not match!');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        },
        'secret-key',
        {expiresIn: '30m'});

        res.status(200).json({token: token, userId: loadedUser._id.toString()});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}