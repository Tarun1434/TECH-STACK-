const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const questionRoutes = require('./routes/questionRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/questions', questionRoutes);

// Start server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();