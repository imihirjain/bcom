const express = require('express');
const { signup, login, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
// router.get('/orders', protect, getUserOrders); // User must be authenticated
router.get('/profile', protect, getUserProfile);

module.exports = router;
