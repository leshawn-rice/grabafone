// External Dependencies
const express = require('express');
// Internal Dependencies
const keyController = require('../controllers/keys.controller');
const { ensureLoggedIn } = require('../middleware/auth.middleware');

const router = express.Router();

// GET
router.get('/get-key-id', ensureLoggedIn, keyController.getKeyId)
// POST/PUT/PATCH/DELETE
router.post('/create', ensureLoggedIn, keyController.createKey);

module.exports = router;