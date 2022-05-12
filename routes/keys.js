const express = require('express');
const { UnauthorizedError } = require('../errors');
const { ensureLoggedIn } = require('../middleware/auth');
const router = express.Router();

const Key = require('../models/key');

router.get('/', async (req, res, next) => {
  console.log('Hello!');
  return res.json({});
});

router.get('/get-key-id', ensureLoggedIn, async (req, res, next) => {
  try {
    const api_key_id = await Key.get(res.locals.user.id);
    return res.json({api_key_id})
  }
  catch (err) {
    return next(err);
  }
})

router.post('/create', ensureLoggedIn, async (req, res, next) => {
  try {
    const api_key = await Key.create(res.locals.user.id);
    return res.json({api_key: api_key.api_key});
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;