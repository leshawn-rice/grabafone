// External Dependencies
const express = require('express');
// Internal Tools/Utils
const { ensureHasAPIKey } = require('../middleware/auth.middleware');
const apiController = require('../controllers/api.controller');

const router = express.Router();

router.get('/devices', ensureHasAPIKey, apiController.getDevices);
router.get('/manufacturers', ensureHasAPIKey, apiController.getManufacturers);

module.exports = router;