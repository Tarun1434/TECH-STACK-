const db = require('../config/db');

exports.getQuestionsByLanguage = async (req, res) => {
    const { language } = req.params;
    try {
        const [questions] = await db.query('SELECT * FROM questions WHERE language = ?', [language]);
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};