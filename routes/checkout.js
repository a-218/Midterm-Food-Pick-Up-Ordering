const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.post("/", (req, res) => {

    const food_id = req.body.food_id;
    const qty = req.body.qty;
    const id = req.session.user.id;
    const notes = req.body.note;

    db.query(`
    INSERT INTO orders (user_id, start_time, duration, note)
    VALUES ($1, $2, $3, $4)
    RETURNING id;`, [id, 'now()', 30, notes])
      .then(data => {

        const order_id = data.rows[0].id;
        console.log("order_id: ", order_id, food_id, qty);
        for (let i = 0; i < food_id.length; i++) {
          db.query(`
          INSERT INTO foods_orders (food_id, order_id, quantity)
          VALUES ($1, $2, $3)
          RETURNING *;`, [food_id[i], order_id, qty[i]])
        }
        req.session.order_id = order_id;
        res.json({ order_id });
        console.log(req.session.order_id);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
      // Promise.All

  });
  return router;
};
