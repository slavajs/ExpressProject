const express = require('express');

const router = express.Router();
const authContr = require('../controllers/auth');

router.get('/signup', authContr.getSignUp);

router.post('/signup', authContr.postSignUp);

router.get('/login', authContr.getLogin)

module.exports = router;