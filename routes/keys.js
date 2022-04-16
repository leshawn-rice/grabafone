const express = require('express');
const { UnauthorizedError } = require('../errors');
const { ensureLoggedIn } = require('../middleware/auth');
const router = express.Router();

const Key = require('../models/key');

router.get('/get-key-id', ensureLoggedIn, async (req, res, next) => {
  try {
    const { user_id } = req.query;
    if (user_id != res.locals.user.id) throw new UnauthorizedError('Invalid user!');
    const api_key = await Key.get(user_id);
    return res.json({api_key_id: api_key.id})
  }
  catch (err) {
    return next(err);
  }
})

router.post('/create', ensureLoggedIn, async (req, res, next) => {
  try {
    const { user_id } = req.body;
    if (user_id != res.locals.user.id) throw new UnauthorizedError('Invalid user!');
    const api_key = await Key.create(user_id);
    return res.json({api_key: api_key.api_key});
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;