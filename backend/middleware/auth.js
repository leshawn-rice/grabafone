'use strict';

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { UnauthorizedError, BadRequestError } = require('../errors');
const { getToken } = require('../helpers/tokens');
const Key = require('../models/key');


/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals
 *
 * It's not an error if no token was provided or if the token is not valid.
 */


function authenticateJWT(req, res, next) {
  try {
    const token = getToken(req);
    if (token) {
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    console.log(err);
    return next();
  }
}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware to use when they must provide a valid token & be user matching
 *  username provided as route param.
 *
 *  If not, raises Unauthorized.
 */

function ensureCorrectUser(req, res, next) {
  try {
    const user = res.locals.user;
    if (!user || user.id !== req.params.id) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

const ensureHasAPIKey = async (req, res, next) => {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const key = authHeader.replace(/^[Bb]earer /, '').trim();
      if (!key) {
        throw new BadRequestError('API Key Missing!');
      }
      const isKeyValid = await Key.validate_key(key);
      if (!isKeyValid) {
        throw new UnauthorizedError('Invalid API Key!');
      }
    }
    else {
      throw new BadRequestError('API Key Missing!');
    }
    return;
  }
  catch (err) {
    return next(err);
  }
}


module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser,
  ensureHasAPIKey,
};
