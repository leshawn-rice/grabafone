'use strict'

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config')

// Creates a token for a user with a 30min expiry date
const createUserToken = (user) => {
  const token = jwt.sign(user, SECRET_KEY, {
    expiresIn: 1800
  });
  return token;
}

// Verifies that the token is valid and not expired
const isTokenValid = (token) => {
  try {
    jwt.verify(token, SECRET_KEY);
    return true;
  }
  catch (err) {
    return false;
  }
}

module.exports = {
  createUserToken,
  isTokenValid
};