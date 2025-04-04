const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const connectDB = async () => {
    try {
        const connection = await db.getConnection();
        console.log('MySQL connected');
        connection.release();
    } catch (error) {
        console.error('DB connection error:', error);
        process.exit(1);
    }
};

module.exports = { db, connectDB };