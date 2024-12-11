const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /auth/register - Register a new user (organizer)
router.post('/register', authController.register);

// POST /auth/login - Login and receive a JWT token
router.post('/login', authController.login);

module.exports = router;
