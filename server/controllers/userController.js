const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const generateToken = require('../utils/generateWebToken');

const userJSONFields = (user, shouldGenerateToken) => {
    let userObject = {
        _id: user._id,
        name: user.name,
        email: user.email,
    }
    if (shouldGenerateToken) {
        return {
            ...userObject,
            token: generateToken(user._id)
        }
    } else {
        return userObject;
    }
}

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json(userJSONFields(user, true));
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists here!');
    }

    const user = await User.create({ name, email, password });
    if (user) {
        res.status(201).json(userJSONFields(user, true));
    } else {
        res.status(400);
        throw new Error('Invalid user data passed');
    }
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

module.exports = {
    authUser,
    registerUser,
    getUsers
}