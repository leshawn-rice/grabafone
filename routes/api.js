// External Dependencies
const express = require('express');
// Internal Tools/Utils
const { ensureHasAPIKey } = require('../helpers/utils');
// DB Models
const Device = require('../models/device');
const Manufacturer = require('../models/manufacturer');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    await ensureHasAPIKey(req, res, next);
    return res.json({status: 'Succeeded!'});
  }
  catch (err) {
    return next(err);
  }
});

router.get('/devices', async (req, res, next) => {
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

router.get('/manufacturers', async (req, res, next) => {
  try {
    const {limit, offset, reversed} = req.query;
    const manufacturers = await Manufacturer.get(limit, offset, reversed);
    if (!manufacturers) return res.json({manufacturers});
    return res.json({manufacturers});
  }
  catch (err) {
    return next(err);
  }
});



/*
router.get('/', async (req, res, next) => {
  try {

  }
  catch (err) {
    return next(err);
  }
});
*/

module.exports = router;