
const sendgrid = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport(
    sendgrid({
      auth: {
        api_key: process.env.MAIL_API
      }
    })
  );


exports.getSupport =  (req, res, next) => {
    res.render('support',{
        pageTitle: 'Support'
    });
}

exports.postSupport = (req, res, next) => {
    const userEmail = req.body.userEmail;
    const feedback = req.body.feedback;
    transporter.sendMail({
        from: 'test@test.com',
        to: 'dimaidiothack@gmail.com',
        subject: 'Support Mail',
        html: `<h1> Support need </h1>
               <p> From ${userEmail} </p>
               <p> ${feedback} </p>`,
              
    });
    return res.redirect('/');
}

