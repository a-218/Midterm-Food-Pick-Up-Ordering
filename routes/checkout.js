const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.post("/", (req, res) => {
    const id = req.session.user.id;
    const notes = req.body.note;
    // const qty = req.body;
    // console.log('id:', id);
    // console.log('notes:', notes);
    // console.log(qty);
    db.query(`
    INSERT INTO orders (user_id, start_time, duration, note)
    VALUES ($1, $2, $3, $4)
    RETURNING id;`, [id, 'now()', 30, notes])
      .then(data => {
        const order_id = data.rows[0].id;
        res.json({ order_id });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
