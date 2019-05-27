const User = require("../models/User");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const sendgrid = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator/check");
const transporter = nodemailer.createTransport(
  sendgrid({
    auth: {
      api_key: process.env.MAIL_API
    }
  })
);

exports.getSignUp = (req, res, next) => {
  res.render("auth/signup.ejs", {
    pageTitle: "Sign Up",
    errorMessage: "",
    oldInput: {
      email: "",
      password: ""
    }
  });
};

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup.ejs", {
      pageTitle: "Sign Up",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password
      }
    });
  }
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        return res.status(422).render("auth/signup", {
          pageTitle: "Sign Up",
          errorMessage: "User with given email already exist",
          oldInput: {
            email: email,
            password: password
          }
        });
      }
      bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword
          });
          return user.save();
        })
        .then(result => {
          transporter.sendMail({
            from: "slavajs@gay.com",
            to: email,
            subject: "Sign Up",
            text: "Thank you for using our web site"
          });
          return res.redirect("/login");
        })
        .catch(err => {
          console.log(err);
          //   const error = new Error(err);
          //   error.statusCode = 500;
          //   return next(err);
        });
    })
    .catch(err => console.log(err));
};

exports.getLogin = (req, res, next) => {
  res.render("auth/login.ejs", {
    pageTitle: "Log In",
    errorMessage: "",
    oldInput: {
      email: "",
      password: ""
    }
  });
};

exports.postLogin = (req, res, next) => {
  const errors = validationResult(req);
  const email = req.body.email;
  const password = req.body.password;
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login.ejs", {
      pageTitle: "Log In",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password
      }
    });
  }

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(422).render("auth/login.ejs", {
          pageTitle: "Log In",
          errorMessage: "There is not user with given email"
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            return res.redirect("/");
          }
          return res.status(422).render("login.ejs", {
            pageTitle: "Log In",
            errorMessage: "Passwords have to match",
            oldInput: {
              email: email,
              password: password
            }
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};
