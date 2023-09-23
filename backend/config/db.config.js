'use strict';

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  const databaseName = 'grabaphone';
  return (process.env.NODE_ENV === 'test')
    ? `postgresql://dev:password@localhost/${databaseName}_test`
    : process.env.DATABASE_URL || `postgresql://dev:password@localhost/${databaseName}`;
}

module.exports = {
  getDatabaseUri
}