const db = require('../db');

class Manufacturer {

  static async create(name = '', description = '') {
    let manufacturer = await db.query(
      `SELECT name, description FROM manufacturers
      WHERE name=$1`,
      [name]
    );

    if (!manufacturer.rows.length) {
      manufacturer = await db.query(
        `INSERT INTO manufacturers
        (name, description)
        VALUES
        ($1, $2)
        RETURNING name, description`,
        [name, description]
      );
    }

    return manufacturer.rows[0]
  }
}

module.exports = Manufacturer;