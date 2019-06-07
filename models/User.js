const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        firstName: {
            type: String,
            require: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            requred: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);