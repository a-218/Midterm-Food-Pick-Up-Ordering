const express = require('express');
const router  = express.Router();
const {sendMessage} = require("../public/scripts/sms");




module.exports = (db) => {
  router.post("/", (req, res) => {
        console.log(`the order over here, ${req.session.user.name}`)
        let restMessage = `Hi ${req.session.user.name}, your order has been confirmed`
        sendMessage(restMessage);


        const user = req.session.user;
        const templateVars = { user };
        console.log(templateVars);
        res.render("index", templateVars);

      // Promise.All
  });



  router.get("/", (req, res) => {
    order_id = req.session.order_id;
    db.query(`
    SELECT quantity, name, description, price
    FROM orders JOIN foods_orders ON orders.id = foods_orders.order_id
    JOIN foods ON foods.id = foods_orders.food_id
    WHERE orders.id = ${order_id};`)
      .then(data => {
        const foods_orders = data.rows;
        res.json({ foods_orders });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  return router;
};
