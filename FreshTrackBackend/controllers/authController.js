const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @route   POST /api/auth/register
// @desc    Register a new user (can be admin if specified)
// @access  Public
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // 1) Validate input
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Missing required fields: name, email, and password are all required."
    });
  }

  try {
    // 2) Check if user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3) Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 4) Create new user (default role = 'user' if not provided)
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "user" // ✅ Allow role input or default to "user"
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: user._id
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({
      message: "Server error during registration",
      error: err.message
    });
  }
};

// @route   POST /api/auth/login
// @desc    Authenticate user & return token
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1) Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2) Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3) Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      role: user.role
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      message: "Server error during login",
      error: err.message
    });
  }
};
