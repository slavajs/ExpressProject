const User = require("../models/User");
const bcrypt = require('bcryptjs');
const sendgrid = require('nodemailer-sendgrid-transport');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    sendgrid({
        auth: {
      api_key: process.env.MAIL_API
        }
    })
)

exports.getSignUp = (req, res, next) => {
    res.render('signup.ejs', {
        pageTitle: 'Sign Up'
    })
}

exports.postSignUp = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    bcrypt
      .hash( password, 12)
      .then(hashedPassword => {
          const user = new User({
              email: email,
              password: hashedPassword
          })
          return user.save()
      })
      .then(result => {
          transporter.sendMail({
              from: 'slavajs@gay.com',
              to: email,
              subject: 'Sign Up',
              text: 'Thank you for using our web site',
          })
          res.redirect('/login');
      })
      .catch(err => {
          console.log(err);
        //   const error = new Error(err);
        //   error.statusCode = 500;
        //   return next(err);
      });
}

exports.getLogin = (req, res, next) => {
    res.render('login.ejs', {
        pageTitle: "Log In"
    })
}

exports.postLogin = (req, res, next) => {

};
