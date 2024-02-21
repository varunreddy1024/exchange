const express = require('express');
const router = express.Router();
const authController = require('../controllers/usersControllers');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);

// Protected routes (require authentication)
// router.use(console.log("pranay"));
router.use(authMiddleware.authenticateUser); // Middleware to authenticate user with JWT

router.get('/profile', authController.getUserProfile);
router.put('/profile', authController.updateUserProfile);

module.exports = router;