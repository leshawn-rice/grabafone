'use strict';

const winston = require('winston');
const expressWinston = require('express-winston');

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'secret-dev';
const PORT = +process.env.PORT || 3001;
const LOG_FILE = '/tmp/grabaphone.log';
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  const databaseName = 'grabaphone';
  return (process.env.NODE_ENV === 'test')
    ? `postgresql://dev:password@localhost/${databaseName}_test`
    : process.env.DATABASE_URL || `postgresql://dev:password@localhost/${databaseName}`;
}
  
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === 'test' ? 1 : 12;

const convertTimestamp = (timestamp) => {
  return timestamp.toUTCString();
}

const WINSTON_CONFIG = {
  transports: [
    new winston.transports.File({filename: LOG_FILE})
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => {
        const formattedDate = convertTimestamp(new Date(info.timestamp))
        return `${formattedDate} [${info.level}]: ${info.message}`
      }
     )
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}", 
  expressFormat: true,
  colorize: false,
  ignoreRoute: (req, res) => false
}

const appLogger = expressWinston.logger(WINSTON_CONFIG);
const utilLogger = winston.createLogger(WINSTON_CONFIG);

module.exports = {
SECRET_KEY,
PORT,
BCRYPT_WORK_FACTOR,
EMAIL_ADDRESS,
EMAIL_PASSWORD,
WINSTON_CONFIG,
getDatabaseUri,
appLogger,
utilLogger,
};