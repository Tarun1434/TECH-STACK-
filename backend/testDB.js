const { connectDB } = require('./config/db');

const testConnection = async () => {
    try {
        await connectDB();
        console.log("✅ MySQL connection successful!");
        process.exit(0);
    } catch (error) {
        console.error("❌ MySQL connection failed:", error.message);
        process.exit(1);
    }
};

testConnection();
