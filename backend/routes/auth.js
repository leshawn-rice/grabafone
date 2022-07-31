const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { createUserToken, getToken, refreshToken } = require('../helpers/tokens');
const { send_email } = require('../helpers/email');

router.post('/login', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.login(username, email, password);
    const token = createUserToken(user);
    return res.json({ token, user });
  }
  catch (err) {
    return next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, confirm_password } = req.body;
    const user = await User.register(username, email, password, confirm_password);
    const token = createUserToken(user);
    return res.json({ token, user });
  }
  catch (err) {
    return next(err);
  }
});

router.get('/refresh-token', async (req, res, next) => {
  try {
    const token = getToken(req);
    const newToken = refreshToken(token);
    return res.json({token: newToken})
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;
