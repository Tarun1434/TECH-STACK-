const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3001', 'http://192.168.1.40:3001'], // Match frontend
    methods: ['GET'],
    credentials: true
}));

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log('MySQL connected');
        connection.release();
    } catch (error) {
        console.error('DB connection error:', error.message);
        process.exit(1);
    }
})();

app.get('/api/questions/:language', async (req, res) => {
    const { language } = req.params;
    try {
        const [questions] = await db.query('SELECT * FROM questions WHERE language = ?', [language]);
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});