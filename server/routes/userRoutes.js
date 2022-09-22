const express = require('express');
const router = express.Router();
const { authUser,
    registerUser,
    getUsers
} = require('../controllers/userController');


router.post('/', registerUser);
router.get('/', getUsers);
router.post('/login', authUser);

module.exports = router;