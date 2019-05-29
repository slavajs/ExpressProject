const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const multer = require("multer");
const path = require("path");
const session = require("express-session");
const MDBStore = require("connect-mongodb-session")(session);

const dotenv = require("dotenv").config();

const notFound = require("./errors/404");
const serverErr = require('./errors/500')

const authRoutes = require("./routes/auth");
const supRoutes = require("./routes/support");

const csrf = require("csurf");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Math.floor(Math.random() * 100000000 + 1) + "_" + file.originalname
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const csrfProtection = csrf();

var store = new MDBStore({
  uri: process.env.MDB_STRING,
  collection: "sessions"
});

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter
  }).single("titlePhoto")
);

app.use(express.static(path.join(__dirname, "public")));
app.use('images', express.static(path.join(__dirname, 'images')))

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
  return res.render("index.ejs", {
    pageTitle: "Main"
  });
});

app.use(authRoutes);
app.use(supRoutes);
app.use(notFound);

app.use(serverErr);

mongoose
  .connect(process.env.MDB_STRING, { useNewUrlParser: true, dbName: "project" })
  .then(res => app.listen(80))
  .catch(err => console.log(err));
