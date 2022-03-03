const mongoose = require("mongoose");
const unique_validator = require('mongoose-unique-validator');
const { isEmail } = require('validator');

const post_schema = new mongoose.Schema({

    created_by: {
        type: String,
        validate: [isEmail, 'invalid email']

    },

    image: {
        type: String,

    },

    title: {
        type: String,

    },

    description: {
    },

});



post_schema.plugin(unique_validator);

module.exports = mongoose.model("post", post_schema);
