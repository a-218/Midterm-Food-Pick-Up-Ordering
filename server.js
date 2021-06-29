// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');
const userRoutes = require('./userRoutes');


// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

// /user/endpoints
app.use('/', userRoutes(db));

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const foodsRoutes = require("./routes/foods");
const ordersRoutes = require("./routes/orders");
const foods_ordersRoutes = require("./routes/foods_orders");
const delete_foods = require("./routes/foods_order_delete");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/foods", foodsRoutes(db));
app.use("/api/orders", ordersRoutes(db));
app.use("/api/foods_orders", foods_ordersRoutes(db));
app.use("/api/delete", delete_foods(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  const user = req.session.user;

  console.log('sdfdsfdsf', user);
  const templateVars = { user };
  res.render("index", templateVars);
});

app.get("/login", (req, res) => {
  const user = req.session.user;
  const templateVars = { user};
  res.render("login", templateVars);
})

app.get("/seafood", (req, res) => {
  const user = req.session.user;
  const templateVars = { user };
  res.render("seafood", templateVars);
});

app.get("/checkout", (req, res) => {
  const user = req.session.user;
  const templateVars = { user };
  res.render("checkout", templateVars);
})



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
