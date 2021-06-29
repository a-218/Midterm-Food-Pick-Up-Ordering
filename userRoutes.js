const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { getUserWithName } = require('./database');

module.exports = function(database) {

  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */
  const login =  function(name, password) {
    return getUserWithName(name)
    .then(user => {
      // if (bcrypt.compareSync(password, user.password)) {
      //   return user;
      // } do this when we have extra time
      if(password === user.password) {
        return user;
      }
      return null;
    });
  }
  exports.login = login;

  router.post('/login', (req, res) => {
    console.log('test');
    const {name, password} = req.body;
    login(name, password)
      .then(user => {
        console.log('test:', user);
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.user = user;
        req.session.foods_id = [];
        // res.send(user);
        // res.send({user: {name: user.name, phone: user.phone, id: user.id}});
        res.redirect('/');
      })
      .catch(e => res.send(e));
  });

  router.post('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
  });

  return router;
}
