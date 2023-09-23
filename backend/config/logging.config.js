'use strict';

const winston = require('winston');
const expressWinston = require('express-winston');

const LOG_FILE = '/tmp/grabaphone.log';


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
  WINSTON_CONFIG,
  appLogger,
  utilLogger,
};