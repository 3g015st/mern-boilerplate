const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/User');

const router = express.Router();

router.post('/signup', [
    body('email')
        .isEmail()
        .withMessage('The email you have entered is invalid!')
        .custom((value, { req }) => {
            return User.findOne({email: value}).then(userDocument => {
                if(userDocument){
                    return Promise.reject('Email address already exists!');
                }
            });
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({min:8}),
    body('firstName')
        .trim()
        .not()
        .isEmpty(),
    body('lastName')
        .trim()
        .not()
        .isEmpty(),
])