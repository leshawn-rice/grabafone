'use strict'

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { getEpoch } = require('./utils');

const getToken = (req) => {
  const authHeader = req.headers && req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace(/^[Bb]earer /, '').trim();
    return token;
  }
  return null;
}

const refreshToken = (token) => {
  try {
    const currentTime = getEpoch();
    const decodedToken = jwt.decode(token, SECRET_KEY);
    const isExpired = decodedToken.exp <= currentTime;
    let tokenToSend = token;
    if (isExpired) {
      const user = { ...decodedToken };
      delete user.iat;
      delete user.exp;
      tokenToSend = createUserToken(user); 
    }
    return tokenToSend;
  }
  catch (err) {
    return token;
  }
}

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
  isTokenValid,
  getToken,
  refreshToken
};