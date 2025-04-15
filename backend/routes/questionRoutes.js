const express = require('express');
const router = express.Router();
const { 
    getQuestionsByLanguage, 
    saveQuestion, 
    getSavedQuestions, 
    registerUser 
} = require('../controllers/questionController');

router.get('/:language', getQuestionsByLanguage);
router.post('/save-question', saveQuestion);
router.get('/saved/:userId', getSavedQuestions);
router.post('/register', registerUser);

module.exports = router;