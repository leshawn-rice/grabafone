const Key = require('../models/key.model');

const getKeyId = async (req, res, next) => {
  try {
    const apiKeyId = await Key.get(res.locals.user.id);
    return res.json({api_key_id: apiKeyId})
  }
  catch (err) {
    return next(err);
  }
};

const createKey = async (req, res, next) => {
  try {
    const apiKey = await Key.create(res.locals.user.id);
    return res.json({api_key: apiKey.api_key});
  }
  catch (err) {
    return next(err);
  }
};

module.exports = {
  getKeyId,
  createKey
};