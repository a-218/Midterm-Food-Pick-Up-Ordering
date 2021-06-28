/*
 * All routes for Foods are defined here
 * Since this file is loaded in server.js into api/foods,
 *   these routes are mounted onto /foods
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM foods;`)
      .then(data => {
        const foods = data.rows;
        const templatevars = {foods}
        console.log(templatevars)
        //res.json( foods );
        console.log('template vars here are,', templatevars,);
       return res.render("seafood",templatevars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });
  return router;
};
