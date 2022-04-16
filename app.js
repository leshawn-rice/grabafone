'use strict';

// External Dependencies
const express = require('express');
const expressWinston = require('express-winston');
// Internal Dependencies
const { WINSTON_CONFIG } = require('./config');
const { NotFoundError } = require('./errors');
const { authenticateJWT } = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const keyRoutes = require('./routes/keys');

const app = express();

app.use(express.json());
// Enable logging
// TODO throw this into a var to use custom logging if necessary
app.use(expressWinston.logger(WINSTON_CONFIG))
app.use('/', authRoutes);

app.use(authenticateJWT);
app.use('/key', keyRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
