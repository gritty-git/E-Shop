const express = require('express');
const router = express.Router();
const { authUser,
    registerUser,
    getUsers
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware.js');


router.post('/', registerUser);
router.route('/').get(protect, getUsers);
router.post('/login', authUser);

module.exports = router;