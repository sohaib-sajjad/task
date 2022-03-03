const mongoose = require("mongoose");
const unique_validator = require('mongoose-unique-validator');
const { isEmail } = require('validator');

const user_schema = new mongoose.Schema({

    name: {
        type: String,

    },

    email: {
        type: String,
        unique: true,
        required: true,
        validate: [isEmail, 'invalid email']

    },

    password: {
        type: String,
        required: true,
        select: false
    },

    image: {
        type: String,
    },

});



user_schema.plugin(unique_validator);

module.exports = mongoose.model("user", user_schema);
