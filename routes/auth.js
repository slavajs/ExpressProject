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
    check("Password", "Password has to be valid")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
  ],
  authContr.postSignUp
);

router.get("/login", authContr.getLogin);

router.post("/login", authContr.postLogin);

module.exports = router;
