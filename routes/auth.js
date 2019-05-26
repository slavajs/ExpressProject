const express = require("express");

const router = express.Router();
const authContr = require("../controllers/auth");
const { check } = require("express-validator/check");

router.get("/signup", authContr.getSignUp);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    check(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters."
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
  ],
  authContr.postSignUp
);

router.get("/login", authContr.getLogin);

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    check("Password", "Password has to be valid")
      .withMessage("This field is required")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
  ],
  authContr.postLogin
);

module.exports = router;
