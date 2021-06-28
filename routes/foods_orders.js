const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`
    SELECT foods.name, description, price FROM foods_orders
    JOIN foods ON foods.id = foods_orders.food_id;`)
      .then(data => {
        const foods_orders = data.rows;
        res.json({ foods_orders });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
