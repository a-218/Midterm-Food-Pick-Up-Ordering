const express = require('express');
const router = express.Router();
const { sendMessage } = require("../public/scripts/sms");


module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log(`#######################, ${req.body.note}`)
    console.log(`#######################, ${req.body.time}`)
    console.log(`the order over here, ${req.session.user.name}`)

    db.query(`
    UPDATE orders SET duration = ${req.body.time}
    WHERE id = ${req.session.order_id};
    `)
    .then(data => {
      res.redirect('/');
    })
    .then(res => {
      let restMessage = `Hi ${req.session.user.name}, your order will be ready in ${req.body.time} minutes`
      sendMessage(restMessage);
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
