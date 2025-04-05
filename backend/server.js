const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'https://techstack-questions-uvxu-lqxfugr5l-tarun-potnuru-s-projects.vercel.app' }));

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        throw err;
    }
    console.log('Database connected!');
});

// API Route for Questions
app.get('/api/questions/:language', (req, res) => {
    const { language } = req.params;
    db.query('SELECT * FROM questions WHERE language = ?', [language], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});