const db = require('../../db');

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  const hashedPassword = await bcrypt.hash('testpassword', BCRYPT_WORK_FACTOR);

  await db.query(`INSERT INTO users (username, email, password) VALUES ('user1', 'u1@test.com', $1)`, [hashedPassword]);
  await db.query(`INSERT INTO users (username, email, password) VALUES ('user2', 'u2@test.com', $1)`, [hashedPassword]);
  await db.query(`INSERT INTO users (username, email, password) VALUES ('user3', 'u3@test.com', $1)`, [hashedPassword]);
}

async function commonBeforeEach() {
  await db.query('BEGIN');
}

async function commonAfterEach() {
  await db.query('ROLLBACK');
}

async function commonAfterAll() {
  // Uncomment this to inspect DB for failed tests
  await db.query('DELETE FROM users');
  await db.query('DELETE FROM devices');
  await db.query('DELETE FROM keys');
  await db.query('DELETE FROM manufacturers');
  await db.query('DELETE FROM specifications');
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};