const db = require('../db');
const { BadRequestError, UnauthorizedError } = require('../errors');
const generateApiKey = require('generate-api-key');

class Key {
  static async get(user_id) {
    if (!user_id) {
      throw new BadRequestError('No user to find keys!');
    }

    const existing_keys = await db.query(`
      SELECT id
      FROM keys 
      WHERE user_id=$1`,
      [user_id]
    );

    if (!existing_keys.rows.length) {
      throw new BadRequestError('User has no keys!');
    }

    return existing_keys.rows[0];
  }

  static async validate_key(key) {
    if (!key) {
      throw new BadRequestError('No key to validate!');
    }

    const api_key = await db.query(`
      SELECT api_key
      FROM keys
      WHERE api_key=$1`,
      [key]
    );

    if (!api_key.rows.length) return false;

    return true;
  }

  static async create(user_id) {
    if (!user_id) {
      throw new BadRequestError('Cannot create key without a user!');
    }

    const user = await db.query(`
      SELECT username
      FROM users
      WHERE id=$1`,
      [user_id]
    );

    if (!user.rows.length) {
      throw new BadRequestError('Cannot create key without a user!');
    }

    const existing_keys = await db.query(`
      SELECT id
      FROM keys 
      WHERE user_id=$1`,
      [user_id]
    );

    if (existing_keys.rows.length) {
      throw new BadRequestError('User already has a key!');
    }

    if (!user.rows[0].confirmed) {
      throw new UnauthorizedError('Must confirm email to generate key!')
    }

    const api_key = generateApiKey({method: 'string', length: 16});

    const new_key = await db.query(`
      INSERT INTO keys
      (api_key, user_id)
      VALUES
      ($1, $2)
      RETURNING api_key`,
      [api_key, user_id]
    );

    return new_key.rows[0]
  }

  static async delete(user_id, key_id) {
    if (!user_id || !key_id) {
      throw new BadRequestError('User ID + Key ID required!');
    }
    
    const key = await db.query(`
      SELECT * FROM keys
      WHERE user_id=$1
      AND id=$2`,
      [user_id, key_id]
    );

    return {'message': 'API Key deleted successfully!'};
  }
  
}

module.exports = Key;