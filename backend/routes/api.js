// External Dependencies
const express = require('express');
// Internal Tools/Utils
const { ensureHasAPIKey } = require('../middleware/auth');
// DB Models
const Device = require('../models/device');
const Manufacturer = require('../models/manufacturer');

const router = express.Router();

router.get('/devices', ensureHasAPIKey, async (req, res, next) => {
  try {
    const params = req.query;
    const devices = await Device.get(params.limit, params.offset, params.reversed, params.specs);
    if (!devices) return res.json({devices});
    return res.json({devices});
  }
  catch (err) {
    return next(err);
  }
});

router.get('/manufacturers', ensureHasAPIKey, async (req, res, next) => {
  try {
    const params = req.query;
    const manufacturers = await Manufacturer.get(params.limit, params.offset, params.reversed);
    if (!manufacturers) return res.json({manufacturers});
    return res.json({manufacturers});
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;