const express = require('express');
const router = express.Router();
const {
    getQuestionsByLanguage,
    searchQuestions,
    saveQuestion,
    getSavedQuestions,
} = require('../controllers/questionController');
const { authenticateToken } = require('../middleware/auth');

router.get('/language/:language', getQuestionsByLanguage);
router.get('/search', searchQuestions);
router.post('/save', authenticateToken, saveQuestion);
router.get('/saved/:userId', authenticateToken, getSavedQuestions);

module.exports = router;