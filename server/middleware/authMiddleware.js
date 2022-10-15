const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const asyncHandler = require('express-async-handler');


const admin = (req, res, next) => {
    //console.log("came here", req.user);
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        //console.log("came here for error", req.user);
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        //console.log(req.headers.authorization);
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized! Token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('NOT AUTHORIZED, NO TOKEN');
    }
});

module.exports = { protect, admin };