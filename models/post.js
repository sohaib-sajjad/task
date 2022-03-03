const mongoose = require("mongoose");
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




module.exports = mongoose.model("post", post_schema);
