const db = require('../services/db.service');
const { BadRequestError, UnauthorizedError } = require('../config/errors.config');

class Manufacturer {
  static async get(limit=100, offset=0, reversed=false) {
    if (!limit) limit=100;
    if (!offset) offset=0;
    if (!reversed) reversed=false;

    limit = limit <= 100 ? limit : 100;
    offset = offset >= 0 ? offset : 0;
    let direction = reversed ? 'DESC' : 'ASC';

    const manufacturers = await db.query(`
      SELECT id, name
      FROM manufacturers
      ORDER BY id ${direction}
      LIMIT $1
      OFFSET $2`,
      [limit, offset]
    );

    for (let i = 0; i < manufacturers.rows.length; i++) {
      let manufacturer = manufacturers.rows[i];
      let devices = await db.query(`
        SELECT id, name
        FROM devices
        WHERE manufacturer_id=$1`,
        [manufacturer.id]
      );

      manufacturers.rows[i].devices = devices.rows;
    }

    return manufacturers.rows;
  }

  static async get_by_id(id=undefined) {
    if (!id) throw new BadRequestError('Manufacturer ID Required!')

    const manufacturers = await db.query(`
      SELECT id, name
      FROM manufacturers
      WHERE id=$1`,
      [id]
    );

    if (!manufacturers.rows.length) {
      throw new BadRequestError(`No Manufacturer with ID ${id}`)
    }

    const manufacturer = manufacturers.rows.pop()

    const devices = await db.query(`
      SELECT id, name
      FROM devices
      WHERE manufacturer_id=$1`,
      [manufacturer.id]
    );
    
    manufacturer.devices = devices.rows;
    return manufacturer;
  }
}

module.exports = Manufacturer;