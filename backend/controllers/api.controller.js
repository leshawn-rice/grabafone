// DB Models
const Device = require('../models/device');
const Manufacturer = require('../models/manufacturer');

const getDevices = async (req, res, next) => {
  try {
    const params = req.query;
    const devices = await Device.get(params.limit, params.offset, params.reversed, params.specs);
    if (!devices) return res.json({devices});
    return res.json({devices});
  }
  catch (err) {
    return next(err);
  }
};

const getManufacturers = async (req, res, next) => {
  try {
    const params = req.query;
    const manufacturers = await Manufacturer.get(params.limit, params.offset, params.reversed);
    if (!manufacturers) return res.json({manufacturers});
    return res.json({manufacturers});
  }
  catch (err) {
    return next(err);
  }
};

module.exports = {
  getDevices,
  getManufacturers
};