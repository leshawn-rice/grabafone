'use strict';

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'secret-dev';
const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === 'test') ? 'grabaphone_test' : process.env.DATABASE_URL || 'grabaphone';
}
  
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === 'test' ? 1 : 12;
  
module.exports = {
SECRET_KEY,
PORT,
BCRYPT_WORK_FACTOR,
getDatabaseUri,
};