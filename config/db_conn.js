const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");

//database connection


mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, {
    useNewUrlParser: true, useUnifiedTopology: true
})

    .then(() => {
        console.log('database is connected');
        process.exit;
    })

    .catch((err) => {
        console.log(err);
        process.exit;

    })

module.exports = mongoose