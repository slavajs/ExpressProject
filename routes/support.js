const express = require("express");
const { check } = require("express-validator/check");
const supportController = require("../controllers/support");

const router = express.Router();

router.get("/support", supportController.getSupport);
router.post(
  "/support",
  [
    check("userEmail")
      .isEmail()
      .withMessage("Please enter a valid email address"),
    check("feedback")
      .isLength({ min: 10 })
      .withMessage("Feedback must contain at least 10 letters")
  ],
  supportController.postSupport
);

module.exports = router;
