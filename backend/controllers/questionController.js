const { db } = require('../config/db');

exports.getQuestionsByLanguage = async (req, res) => {
    const { language } = req.params;
    try {
        const [questions] = await db.query('SELECT * FROM questions WHERE language = ?', [language]);
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.saveQuestion = async (req, res) => {
    const { userId, questionId } = req.body;
    try {
        await db.query('INSERT INTO saved_questions (userId, questionId) VALUES (?, ?)', [userId, questionId]);
        res.json({ success: true, message: 'Question saved successfully' });
    } catch (error) {
        console.error('Error saving question:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getSavedQuestions = async (req, res) => {
    const { userId } = req.params;
    try {
        const [saved] = await db.query(
            'SELECT q.* FROM questions q JOIN saved_questions sq ON q.id = sq.questionId WHERE sq.userId = ?',
            [userId]
        );
        res.json(saved);
    } catch (error) {
        console.error('Error fetching saved questions:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.registerUser = async (req, res) => {
    const { userId, username } = req.body;
    try {
        const [existing] = await db.query('SELECT * FROM users WHERE userId = ?', [userId]);
        if (existing.length > 0) {
            return res.status(400).json({ success: false, message: 'User ID already exists' });
        }
        await db.query('INSERT INTO users (userId, username) VALUES (?, ?)', [userId, username]);
        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};