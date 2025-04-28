const router = require('express').Router();
const aiController = require('../controllers/ai.controller');

router.post('/aires',aiController.genResponse);

module.exports = router;