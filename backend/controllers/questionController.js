const { db } = require('../config/db');

// Get questions by language
const getQuestionsByLanguage = async (req, res) => {
    const { language } = req.params;
    try {
        const [questions] = await db.query('SELECT * FROM questions WHERE language = ?', [language]);
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Search questions
const searchQuestions = async (req, res) => {
    const { query } = req.query;
    try {
        const [questions] = await db.query(
            'SELECT * FROM questions WHERE question LIKE ? OR language LIKE ?',
            [`%${query}%`, `%${query}%`]
        );
        res.json(questions);
    } catch (error) {
        console.error('Error searching questions:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Save a question to favorites
const saveQuestion = async (req, res) => {
    const { userId, questionId } = req.body;
    try {
        const [existing] = await db.query(
            'SELECT * FROM saved_questions WHERE userId = ? AND questionId = ?',
            [userId, Number(questionId)]
        );

        if (existing.length > 0) {
            return res.json({ success: true, message: 'Question already saved' });
        }

        await db.query(
            'INSERT INTO saved_questions (userId, questionId) VALUES (?, ?)',
            [userId, Number(questionId)]
        );

        res.json({ success: true, message: 'Question saved successfully' });
    } catch (error) {
        console.error('Error saving question:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get saved questions for a user
const getSavedQuestions = async (req, res) => {
    const { userId } = req.params;
    try {
        const [savedQuestions] = await db.query(
            `SELECT q.* FROM questions q
             JOIN saved_questions sq ON q.id = sq.questionId
             WHERE sq.userId = ?`,
            [userId]
        );

        res.json(savedQuestions);
    } catch (error) {
        console.error('Error fetching saved questions:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Unsave a question
const unsaveQuestion = async (req, res) => {
    const { userId, questionId } = req.body;
    try {
        if (!userId || !questionId) {
            return res.status(400).json({ success: false, message: 'userId and questionId are required' });
        }
        if (req.user.userId !== userId) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        const numericQuestionId = Number(questionId);
        if (isNaN(numericQuestionId)) {
            return res.status(400).json({ success: false, message: 'Invalid questionId' });
        }

        const [result] = await db.query(
            'DELETE FROM saved_questions WHERE userId = ? AND questionId = ?',
            [userId, numericQuestionId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Saved question not found' });
        }

        res.json({ success: true, message: 'Question unsaved successfully' });
    } catch (error) {
        console.error('Error unsaving question:', error);
        res.status(500).json({ success: false, message: 'Failed to unsave question' });
    }
};

module.exports = {
    getQuestionsByLanguage,
    searchQuestions,
    saveQuestion,
    getSavedQuestions,
    unsaveQuestion
};
