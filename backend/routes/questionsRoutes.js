const express = require('express');
const router = express.Router();
const { getQuestions } = require('../controllers/questionController');

router.get('/:language', getQuestions);

module.exports = router;