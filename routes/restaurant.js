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
  return router;
};
