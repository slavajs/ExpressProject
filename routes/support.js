const express = require('express');
const supportController = require('../controllers/support');

const router = express.Router();

router.get('/support',supportController.getSupport);
router.post('/support',supportController.postSupport);

module.exports = router;