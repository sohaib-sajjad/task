
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const user_model = require('./../models/user.js')


module.exports = async function (req, res, next) {

    const token = req.header('x-auth-header');

    if (!token) return res.status(403).send('Access Denied: No Token Provided!');


    try {

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        let result = await user_model.findOne({ email: decoded.email })

        if (!result) return res.status(403).json({ message: "access denied" })

        next();
    }


    catch (err) {


        console.log(err)
        return res.status(500).send(err);
    }

}







// module.exports = auth;
