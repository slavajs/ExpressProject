const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const session = require("express-session");
const MDBStore = require("connect-mongodb-session")(session);
const app = express();

const notFound = require('./errors/404')
const authRoutes = require('./routes/auth');

const URI = "mongodb+srv://Dmitriy:WarriorXPro2004@dima-avikx.mongodb.net/testProject";
var store = new MDBStore({
  uri: URI,
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
app.get('/', (req, res, next) => {
   res.render('index.ejs',{
    pageTitle: 'Main'
  })
})

app.use(authRoutes);
app.use(notFound);


mongoose
  .connect(URI, { useNewUrlParser: true })
  .then(res => app.listen(3000))
  .catch(err => console.log(err));
