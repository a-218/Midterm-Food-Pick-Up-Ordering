const express = require('express');
const router = express.Router();
const { sendMessage } = require("../public/scripts/sms");


module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log(`#######################, ${req.body.note}`)
    console.log(`#######################, ${req.body.time}`)
    console.log(`the order over here, ${req.session.user.name}`)
    let restMessage = `Hi ${req.session.user.name}, your order will be ready in ${req.body.time} minutes`
    sendMessage(restMessage);


    const user = req.session.user;
    const templateVars = { user };
    console.log(templateVars);
    res.render("index", templateVars);

    // Promise.All
  });


  return router;
};
