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

exports.getSupport = (req, res, next) => {
  res.render("support", {
    message: 'Feedback',
    pageTitle: "Support",
    errorMessage: '',
    oldInput: {
      userEmail: '',
      feedback: ''
    }
  });
};

exports.postSupport = (req, res, next) => {
  const userEmail = req.body.userEmail;
  const feedback = req.body.feedback;
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.render('support', {
      message: 'Feedback',
      pageTitle: 'Support',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        userEmail: userEmail,
        feedback: feedback
      }
    })
  }
  transporter.sendMail({
    from: "test@test.com",
    to: "dimaidiothack@gmail.com",
    subject: "Support Mail",
    html: `<h1> Support need </h1>
      <p> From ${userEmail} </p>
      <p> ${feedback} </p>`
  });
  return res.render("support", {
    pageTitle: 'Support',
    errorMessage: '',
    message: "Your feedback has been sent",
    oldInput: {
      userEmail: '',
      feedback: ''
    }
  });
};
