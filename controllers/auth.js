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

    const {firstName, lastName, email, password} = req.body;
}