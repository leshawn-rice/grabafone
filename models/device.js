const db = require('../db');
const { BadRequestError, UnauthorizedError } = require('../errors');
const { convertValue } = require('../helpers/utils');

class Device {
  static async get(limit=100, offset=0, reversed=false, specifications=undefined) {
    if (!limit) limit=100;
    if (!offset) offset=0;
    if (!reversed) reversed=false;
    if (!specifications) specifications={};

    limit = limit <= 100 ? limit : 100;
    offset = offset >= 0 ? offset : 0;
    let direction = reversed ? 'DESC' : 'ASC';


    /**
     * Allow for filter on specs queries
     */
    let specs_filter = '';
    let values = [];
    if (specifications !== undefined) {
      let i = 1;
      for (const [key, value] of Object.entries(specifications)) {
        specs_filter += `AND key ilike $${i} AND value ilike $${i+1}`
        values.push(`%${key}%`);
        values.push(`%${value}%`);
      }
    }

    const devices = await db.query(`
      SELECT devices.id, devices.manufacturer_id, devices.name
      FROM devices
      JOIN specifications
      ON specifications.device_id=devices.id
      ${specs_filter}
      ORDER BY id ${direction}
      LIMIT $${values.length+1}
      OFFSET $${values.length+2}`,
      [...values, limit, offset]
    );

    for (let i = 0; i < devices.rows.length; i++) {
      let device = devices.rows[i];
      let specs = await db.query(`
        SELECT category, key, value
        FROM specifications
        WHERE device_id=$1`,
        [device.id]
      );

      let stats = {};

      for (let spec of specs.rows) {
        let { category, key, value } = spec;
        value = convertValue(value);
        if (!stats[category]) {
          stats[category] = {};
          stats[category][key] = value;
        }
        else {
          stats[category][spec.key] = spec.value;
        }
      }

      devices.rows[i].specifications = stats;
    }

    for (let device of devices.rows) {

      for (const [key, val] of Object.entries(specifications)) {
        
      }
    }

    return devices.rows;
  }
}

module.exports = Device;