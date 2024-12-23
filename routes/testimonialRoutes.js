const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const Sentiment = require("sentiment"); // Import sentiment library

const sentiment = new Sentiment();

// Route to add a new testimonial
router.post("/add", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Analyze sentiment of the message
    const sentimentResult = sentiment.analyze(message);
    const sentimentScore = sentimentResult.score; // Positive score = positive, negative = negative

    const newTestimonial = new Testimonial({
      name,
      email,
      message,
      sentimentScore, // Save the sentiment score
    });

    await newTestimonial.save();
    res.status(201).json({ message: "Testimonial submitted successfully." });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while submitting the testimonial.",
    });
  }
});

// Route to fetch only the first two positive testimonials
router.get("/all", async (req, res) => {
  try {
    // Fetch only the first two positive testimonials based on sentiment score
    const testimonials = await Testimonial.find({ sentimentScore: { $gt: 0 } })
      .sort({ createdAt: -1 })  // Sort by creation date (most recent first)
      .limit(2);  // Limit the results to only the first two testimonials

    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving testimonials.",
    });
  }
});
module.exports = router;
