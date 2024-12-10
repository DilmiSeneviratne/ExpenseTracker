const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Import User model
const authMiddleware = require("../middleware/authMiddleware"); // Import authentication middleware
const router = express.Router();

// Register Route
router.post("/register",async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    // Save new user to the database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id , user: user}, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send back token to the client
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout Route
router.post("/logout", authMiddleware, (req, res) => {
  try {
    // Invalidate token by clearing it from the client side
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
