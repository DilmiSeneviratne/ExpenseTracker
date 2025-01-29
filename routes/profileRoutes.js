const express = require("express");
const multer = require("multer");
const User = require("../models/user");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userValidationSchema = require("../validations/userValidations");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary storage

// Profile Picture Upload Route
router.post(
  "/upload-profile-picture/:id",
  upload.single("profilePicture"),
  async (req, res) => {
    const userId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = `uploads/${req.file.filename}`;
    console.log(`File uploaded for user ${userId}: ${filePath}`);

    try {
      const { error } = userValidationSchema.validate({
        profilePicture: filePath,
      });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const user = await User.findByIdAndUpdate(
        userId,
        { profilePicture: filePath },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "Profile picture uploaded successfully",
        user,
      });
    } catch (error) {
      console.error("Error saving file path:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Serve uploaded files statically
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Fetch User Details Route
router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Change Password Route
router.put("/change-password/:userId", async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { userId } = req.params;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Validate new password
  const { error } = userValidationSchema.validate({ password: newPassword });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error changing password:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Update Profile Route
router.put("/update-profile/:userId", async (req, res) => {
  const { username, email } = req.body;
  const userId = req.params.userId;

  // Validate username and email
  const { error } = userValidationSchema.validate({
    username,
    email,
    password: "temporary", // Skip password for profile update
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();

    const updatedToken = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      token: updatedToken,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
});

module.exports = router;
