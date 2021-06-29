const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/:id", (req, res) => {
    db.query(`
    DELETE FROM foods_orders WHERE id = ${req.params.id};`)
      .then(() => {
        res.redirect("/checkout");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
