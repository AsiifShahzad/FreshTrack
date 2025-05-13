const express = require("express");
const cors    = require("cors");
const dotenv  = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();


// Start the mailer scheduler (must come after dotenv.config())
require("./utils/mailer");

console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI?.slice(0, 20) + "…");

// Connect to MongoDB
connectDB();

// Import routes
const authRoutes    = require("./routes/authRoutes");
const userRoutes    = require("./routes/userRoutes");
const adminRoutes   = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");

// Initialize Express app
const app = express();

// Standard middleware
app.use(cors());
app.use(express.json());

// Route handlers
app.use("/api/auth",     authRoutes);        // Authentication routes (login, register)
app.use("/api/user",     userRoutes);        // User-specific routes (profile, etc.)
app.use("/api/admin",    adminRoutes);       // Admin-only routes
app.use("/api/products", productRoutes);     // Product CRUD routes

// Global error-handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
