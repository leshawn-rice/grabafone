'use strict';

// External Dependencies
const express = require('express');
// Internal Dependencies
const { appLogger } = require('./config');
const { NotFoundError } = require('./errors');
const { authenticateJWT } = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const keyRoutes = require('./routes/keys');
const apiRoutes = require('./routes/api');

const app = express();

app.use(express.json());
// Enable logging
// TODO throw this into a var to use custom logging if necessary
app.use(appLogger)
app.use('/', authRoutes);

app.use(authenticateJWT);
app.use('/key', keyRoutes);
app.use('/api', apiRoutes);

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
