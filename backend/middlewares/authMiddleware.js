const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const dotenv = require('dotenv');
dotenv.config();

const protect = expressAsyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            token = req.headers.authorization.split(" ")[1];


            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();

        } catch(err) {
            res.status(401);
            throw new Error("Not authorised, taken failed");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("No token found to authorise!");
    }
});

module.exports = protect;