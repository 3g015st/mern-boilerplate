const User = require('../models/User');
const { validationResult } = require('express-validator/check');

exports.signup = (req, res) => {
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
}