const dotenv = require('dotenv');
dotenv.config();
const multer = require("multer");
const user_model = require('./../models/user');
const bcrypt = require("bcrypt");
const path = require('path');
const jwt = require('jsonwebtoken');


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'user_images/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

module.exports = (app) => {


    //CREATE ADMIN PROFILE

    app.post("/sign-up", upload.single('image'), async (req, res, next) => {



        // console.log(req.file)

        const img = path.join(__dirname, `./../user_images/${req.file.originalname}`)

        let hash = await bcrypt.hash(req.body.password, 10)

            .catch((e) => {

                console.log(e);
                return res.status(500).send(e);

            })

        const reg = new user_model({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            image: img
        });

        reg
            .save()

            .then((result) => {

                result.password = undefined

                res.status(200).json({
                    message: "Registered Successfully!",
                    profile: result,
                });
            })

            .catch((err) => {

                console.log(err);

                return res.status(500).json({
                    error: err,
                });

            });
    });

    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


    app.post("/sign-in", async (req, res, next) => {

        try {

            let user = await user_model.findOne({ email: req.body.email })


            if (!user) {
                return res.status(401).json({
                    message: "user does not exist!",
                });
            }

            let result = await bcrypt.compare(req.body.password, user.password)


            if (!result) {

                return res.status(401).json({
                    message: "password match fail!",
                });
            }

            if (result) {

                const token = jwt.sign(

                    { email: user.email },

                    process.env.SECRET_KEY, {

                    expires_in: "24h"

                });


                res.header('x-auth-header', token).json({
                    mesage: "logged in successfully",
                    email: user.email,
                });

            }

        }

        catch (err) {

            res.status(500).json({
                error: err,

            });

        }

    });

}