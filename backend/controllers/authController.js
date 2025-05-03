const { db } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { userId, username, password } = req.body;

        if (!userId || !username || !password) {
            return res.status(400).json({
                success: false,
                message: 'User ID, username, and password are required.',
            });
        }

        // Check if userId exists
        const [existingUser] = await db.query('SELECT * FROM users WHERE userId = ?', [userId]);
        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'User ID already exists. Please choose a different one.',
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        await db.query('INSERT INTO users (userId, username, password) VALUES (?, ?, ?)', [
            userId,
            username,
            hashedPassword,
        ]);

        // Generate JWT
        const token = jwt.sign({ userId, username }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: { userId, username },
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { userId, password } = req.body;

        if (!userId || !password) {
            return res.status(400).json({
                success: false,
                message: 'User ID and password are required.',
            });
        }

        // Find user
        const [users] = await db.query('SELECT * FROM users WHERE userId = ?', [userId]);
        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid User ID.',
            });
        }

        const user = users[0];

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password.',
            });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user.userId, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: { userId: user.userId, username: user.username },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
};

// Logout (client-side token removal)
exports.logout = (req, res) => {
    res.json({ success: true, message: 'Logout successful' });
};

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        const { userId } = req.user;

        const [users] = await db.query('SELECT userId, username FROM users WHERE userId = ?', [userId]);
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            user: users[0],
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};