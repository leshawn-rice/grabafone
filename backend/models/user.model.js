// External
const bcrypt = require('bcrypt');
// Internal
const { BadRequestError, InternalServerError, UnauthorizedError } = require('../config/errors.config');
const db = require('../services/db.service');
const { BCRYPT_WORK_FACTOR } = require('../config/general.config');

class User {

  static async checkIfUserExists(shouldExist = false, userData = { username: undefined, email: undefined }) {
    const { username, email } = userData;

    const existingUser = await db.query(
      `SELECT id, email, username, created_at, confirmed
      FROM Users
      WHERE username = $1
      OR email = $2`,
      [username, email]
    );

    if (existingUser.rows.length && !shouldExist) {
      throw new BadRequestError('User already exists');
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

  static async register(username = undefined, email = undefined, password = undefined, confirm_password = undefined) {
    if (!username || !email || !password || !confirm_password) {
      throw new BadRequestError('Missing Data');
    }

    if (password !== confirm_password) {
      throw new BadRequestError('Passwords must match!')
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
    if ((!username && !email) || !password) {
      throw new BadRequestError('Invalid username/password');
    }

    await User.checkIfUserExists(true, { username, email });

    const userRows =  await db.query(
      `SELECT * FROM users
      WHERE username=$1
      OR email=$2`,
      [username, email]
    );

    const user = userRows.rows[0];

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError('Invalid username/password');
    }

    delete user.password;

    return user;
  }
}

module.exports = User;
