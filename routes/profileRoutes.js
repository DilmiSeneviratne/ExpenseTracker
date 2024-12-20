const express = require("express");
const multer = require("multer");
const User = require("../models/user"); // Import User model

const router = express.Router();

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be stored in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name
  },
});

const upload = multer({ storage: storage });

// Route to upload a profile picture
router.post(
  "/upload-profile-picture/:id",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const userId = req.params.id; // User ID from the URL parameter
      const filePath = req.file.path; // Path of the uploaded file

      // Update the user's profilePicture field
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePicture: filePath },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({
          message: "Profile picture uploaded successfully",
          user: updatedUser,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;
