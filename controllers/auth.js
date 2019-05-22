const User = require("../models/User");

exports.getLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
    .hash(12, password)
    .then(hashedPassword => {
        const user = new User({
            email: email,
            password: hashedPassword
        })
        return user.save()
    })
    .then(result => {
        res.redirect('/login');
    })
    .catch(err => {
        const error = new Error(err);
        error.statusCode = 500;
        return next(err);
    });
};
