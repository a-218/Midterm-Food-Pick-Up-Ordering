/*
 * All routes for Foods are defined here
 * Since this file is loaded in server.js into api/foods,
 *   these routes are mounted onto /foods
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    if (req.session.user) {
      db.query(`SELECT * FROM foods;`)
      .then(data => {
        const user = req.session.user
        const foods = data.rows;
        const templatevars = {foods,user}
        //console.log(templatevars)
        //res.json( foods );
        //console.log('template vars here are,', templatevars,);
       return res.render("popular",templatevars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    } else {
    db.query(`SELECT * FROM foods;`)
      .then(data => {
        const user = req.session.user
        const foods = data.rows;
        const templatevars = {foods,user}
        //console.log(templatevars)
        //res.json( foods );
        //console.log('template vars here are,', templatevars,);
       return res.render("popular_noorder",templatevars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    }
  });

  // router.get("/:order_id", (req, res) => {

  //   db.query(`SELECT * FROM foods;`)
  //     .then(data => {
  //       const user = req.session.user
  //       const foods = data.rows;
  //       const templatevars = {foods,user}
  //       //console.log(templatevars)
  //       //res.json( foods );
  //       //console.log('template vars here are,', templatevars,);
  //      return res.render("seafood",templatevars);
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });

  // });



  router.post("/", (req,res) => { //insert order

    //  ////////this needs to be able to pass the cookies in ehere as a user_id///////
    //   const sdfdsf = req.seesion.user_id;
    //   console.log('tehrererer^^^^^^^^^^^^^^^^^', sdfdsf );

       res.redirect(`foods`);

      const user_id = req.session.user.id
      const currentTime = new Date();
      db.query(`INSERT INTO orders (user_id, start_time, duration, gst) VALUES ($1, $2,$3, $4) RETURNING *`, [user_id,currentTime,520, 999 ])
        .then(data => {
          const order = data.rows[0];
          req.session.order_id = order.id; //order ID
          console.log('order id in teh session*****************', req.session.order_id);
          //const templatevars = {order,user_id}
         // console.log('****************', templatevars)
          //res.json( foods );
         // console.log('orders here are,', templatevars,)
         return res.redirect(`foods/${order.id}`);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });

  router.post("/:food_id", (req,res) => {

      const foods_id = req.params.food_id;
      req.session.foods_id.push(foods_id);
      res.redirect('/foods');
      //console.log('*****************', req.session.foods_id)
      //console.log('@@@@@@@@@@@@@@@@@@@@@', foods_id)
      // db.query(`INSERT INTO foods_orders (food_id, order_id, quantity) VALUES ($1,$2,$3);`, [foods_id, order_id,1])
      //   .then(data => {
      //     const foods = data.rows;
      //     const templatevars = {foods}
      //    // console.log(templatevars)
      //     //res.json( foods );
      //     //console.log('template vars here are,', templatevars,);
      //     res.redirect (`/foods/${order_id}`)
      //   })
      //   .catch(err => {
      //     res
      //       .status(500)
      //       .json({ error: err.message });
      //   });
    })


  return router;
};
