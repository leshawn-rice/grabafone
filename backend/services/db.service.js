'use strict';

// External Dependencies
const { Client } = require('pg');

/** Database setup for grabaphone. */
const { getDatabaseUri } = require('../config/db.config');
const db = new Client({
  connectionString: getDatabaseUri(),
});

db.connect();

module.exports = db;