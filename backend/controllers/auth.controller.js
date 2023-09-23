const User = require('../models/user.model');
const { createUserToken, getToken, refreshToken } = require('../helpers/tokens.helper');
const { send_email } = require('../helpers/email.helper');

const login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.login(username, email, password);
    const token = createUserToken(user);
    return res.json({ token, user });
  }
  catch (err) {
    return next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, password, confirm_password } = req.body;
    const user = await User.register(username, email, password, confirm_password);
    const token = createUserToken(user);
    return res.json({ token, user });
  }
  catch (err) {
    return next(err);
  }
};

const renewToken = async (req, res, next) => {
  try {
    const token = getToken(req);
    const newToken = refreshToken(token);
    return res.json({token: newToken})
  }
  catch (err) {
    return next(err);
  }
};

module.exports = {
  register,
  login,
  renewToken
};
