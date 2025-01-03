const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /auth/register - Register a new user (organizer)
router.post('/register', authController.register);

// POST /auth/login - Login and receive a JWT token
router.post('/login', authController.login);

// POST /auth/logout - Logout and send success response
router.post('/logout', authController.logout);

module.exports = router;
