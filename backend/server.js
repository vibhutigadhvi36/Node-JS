
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config({
    path: require("path").join(__dirname, ".env")
});

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173"
})); 

app.use(express.json());

// Import Routes
const bookRoutes = require("./routes/bookRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Home Route
app.get("/", (req, res) => {
    res.send("Book Store API is running!");
});

// API Routes
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);

// Start Server
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();