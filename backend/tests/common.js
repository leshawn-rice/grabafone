// External
const bcrypt = require('bcrypt')
// Internal
const { BCRYPT_WORK_FACTOR } = require('../config/general.config')
const db = require('../services/db.service');

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  const hashedPassword = await bcrypt.hash('testpassword', BCRYPT_WORK_FACTOR);

  // Re-Seed the Test DB
  await db.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1`);
  await db.query(`ALTER SEQUENCE keys_id_seq RESTART WITH 1`);
  await db.query(`ALTER SEQUENCE manufacturers_id_seq RESTART WITH 1`);
  await db.query(`ALTER SEQUENCE devices_id_seq RESTART WITH 1`);
  await db.query(`ALTER SEQUENCE specifications_id_seq RESTART WITH 1`);

  // Create 3 fake users
  await db.query(`INSERT INTO users (username, email, password, confirmed) VALUES ('user1', 'u1@test.com', $1, true)`, [hashedPassword]);
  await db.query(`INSERT INTO users (username, email, password, confirmed) VALUES ('user2', 'u2@test.com', $1, true)`, [hashedPassword]);
  await db.query(`INSERT INTO users (username, email, password, confirmed) VALUES ('user3', 'u3@test.com', $1, true)`, [hashedPassword]);
  // Create a fake API key for each user
  await db.query(`INSERT INTO keys (api_key, user_id, restricted) VALUES ('0001', 1, false)`);
  await db.query(`INSERT INTO keys (api_key, user_id, restricted) VALUES ('0002', 2, false)`);
  // await db.query(`INSERT INTO keys (api_key, user_id, restricted) VALUES ('0003', 3, false)`);
  // Create 2 fake manufacturers
  await db.query(`INSERT INTO manufacturers (name) VALUES ('Apple')`)
  await db.query(`INSERT INTO manufacturers (name) VALUES ('Samsung')`)
  // Create 1 fake device for each manufacturer
  await db.query(`INSERT INTO devices (name, manufacturer_id) VALUES ('Apple iPhone 1', 1)`)
  await db.query(`INSERT INTO devices (name, manufacturer_id) VALUES ('Samsung Galaxy S1', 2)`)
  // Create 2 fake specifications for each device
  await db.query(`INSERT INTO specifications (device_id, category, key, value) VALUES (1, 'Display', 'Screen Size', '4.5')`)
  await db.query(`INSERT INTO specifications (device_id, category, key, value) VALUES (2, 'Display', 'Screen Size', '4.7')`)
  await db.query(`INSERT INTO specifications (device_id, category, key, value) VALUES (1, 'Battery', 'Battery Size', '1000mAh')`)
  await db.query(`INSERT INTO specifications (device_id, category, key, value) VALUES (2, 'Battery', 'Battery Size', '800mAh')`)
}

async function commonBeforeEach() {
  await db.query('BEGIN');
}

async function commonAfterEach() {
  await db.query('ROLLBACK');
}

async function commonAfterAll() {
  // Comment this to inspect DB for failed tests
  await db.query('DELETE FROM specifications');
  await db.query('DELETE FROM devices');
  await db.query('DELETE FROM manufacturers');
  await db.query('DELETE FROM keys');
  await db.query('DELETE FROM users');
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};