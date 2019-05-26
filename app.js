const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");

const path = require("path");
const session = require("express-session");
const MDBStore = require("connect-mongodb-session")(session);


const dotenv = require("dotenv").config();
const notFound = require("./errors/404");
const authRoutes = require("./routes/auth");
const supRoutes = require('./routes/support');
const csrf = require("csurf");

const app = express();

const csrfProtection = csrf();

var store = new MDBStore({
  uri: process.env.MDB_STRING,
  collection: "sessions"
});

app.use(express.static(path.join(__dirname, "public")));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  session({
    secret: "123456789",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.get("/", (req, res, next) => {
  res.render("index.ejs", {
    pageTitle: "Main"
  });
});

app.use(authRoutes);
app.use(supRoutes);
app.use(notFound);

mongoose
  .connect(process.env.MDB_STRING, { useNewUrlParser: true, dbName: "project" })
  .then(res => app.listen(3000))
  .catch(err => console.log(err));
