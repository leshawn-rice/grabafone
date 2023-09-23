'use strict';

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'secret-dev';
const PORT = +process.env.PORT || 3001;
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === 'test' ? 1 : 12;

module.exports = {
SECRET_KEY,
PORT,
BCRYPT_WORK_FACTOR,
EMAIL_ADDRESS,
EMAIL_PASSWORD,
};