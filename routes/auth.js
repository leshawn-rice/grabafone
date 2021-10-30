const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { createUserToken } = require('../helpers/tokens');

router.post('/login', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.login(username, email, password);
    console.log(user);
    const token = createUserToken(user);
    return res.json({ token, user });
  }
  catch (err) {
    return next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.register(username, email, password);
    console.log(user);
    const token = createUserToken(user);
    return res.json({ token, user });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;