const { db } = require('../config/db');

const getQuestions = async (req, res) => {
    try {
        const { language } = req.params;
        const [rows] = await db.query('SELECT * FROM questions WHERE language = ?', [language]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getQuestions };