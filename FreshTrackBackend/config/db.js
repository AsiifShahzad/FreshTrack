const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB initial connection error:", err.message);
    process.exit(1);
  }

  // Listen for runtime errors on the connection
  mongoose.connection.on("error", err => {
    console.error("Mongo connection error:", err);
  });
};

module.exports = connectDB;
