// External Dependencies
const express = require('express');
// Internal Dependencies
const authController = require('../controllers/auth.controller');

const router = express.Router();


router.get('/refresh-token', authController.refreshToken);

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
