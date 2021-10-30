const { BadRequestError, InternalServerError } = require('../errors');
const bcrypt = require('bcrypt');
const db = require('../db');
const { BCRYPT_WORK_FACTOR } = require('../config');

class User {

  static async checkIfUserExists(shouldExist = false, userData = { username: undefined, email: undefined }) {
    const { username, email } = userData;

    const existingUser = await db.query(
      `SELECT *
      FROM Users
      WHERE username = $1
      OR email = $2`,
      [username, email]
    );

    if (existingUser.rows.length && !shouldExist) {
      throw new BadRequestError('User Exists');
    }
    else if (!existingUser.rows.length && shouldExist) {
      throw new BadRequestError('Invalid username/password');
    }
    else if (existingUser.rows.length && shouldExist) {
      return existingUser.rows[0];
    }
    else if (!existingUser.rows.length && !shouldExist) {
      return;
    }
    else {
      throw new InternalServerError('Internal Server Error');
    }
  }

  static async register(username = undefined, email = undefined, password = undefined) {
    if (!username || !email || !password) {
      throw new BadRequestError('Missing Data');
    }

    await User.checkIfUserExists(false, { username, email });

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const user = await db.query(
      `INSERT INTO Users
      (username, email, password)
      VALUES
      ($1, $2, $3)
      RETURNING id, username, email, created_at, confirmed`,
      [username, email, hashedPassword]
    );

    return user.rows[0];
  }

  static async login(username = undefined, email = undefined, password = undefined) {
    if (!username && !email) {
      throw new BadRequestError('Invalid username/password');
    }

    if (!password) {
      throw new BadRequestError('Invalid username/password');
    }

    const user = await User.checkIfUserExists(true, { username, email });

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestError('Invalid username/password');
    }

    delete user.password;

    return user;
  }
}

module.exports = User;