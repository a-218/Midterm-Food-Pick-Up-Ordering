const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log(req.session.foods_id);
    db.query(`
    SELECT id, name, description, price
    FROM foods
    WHERE id IN (${req.session.foods_id.join(', ')});`)
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


// SELECT foods_orders.id, foods.name, description, price, foods_orders.quantity FROM foods_orders
// JOIN foods ON foods.id = foods_orders.food_id
// WHERE foods.id IN (${req.session.foods_id.join(', ')});`)
