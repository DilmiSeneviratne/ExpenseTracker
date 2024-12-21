const express = require("express");
const multer = require("multer");
const User = require("../models/user"); // Import User model
const path = require("path");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary storage

router.post(
  "/upload-profile-picture/:id",
  upload.single("profilePicture"),
  async (req, res) => {
    const userId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = `uploads/${req.file.filename}`; // Use relative path
    console.log(`File uploaded for user ${userId}: ${filePath}`);

    try {
      // Save the file path to the user's record in the database
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

// API to fetch user details
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

module.exports = router;
