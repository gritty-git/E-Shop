const express = require('express');
const router = express.Router();
const { authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware.js');


router.post('/', registerUser);
router.route('/').get(protect, admin, getUsers);
router.post('/login', authUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

module.exports = router;