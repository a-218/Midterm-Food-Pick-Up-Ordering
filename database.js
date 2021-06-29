// load .env data into process.env
require('dotenv').config();

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();


const getUserWithName = function(name) {
  return db.query(`SELECT * FROM users WHERE name = $1`, [name])
    .then((result) => {
      if (result.rows.length > 0) {
        console.log(result.rows[0]);
        return result.rows[0];
      }
      return null;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { getUserWithName };
