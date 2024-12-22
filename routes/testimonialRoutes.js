const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");

// Route to add a new testimonial
router.post("/add", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newTestimonial = new Testimonial({ name, email, message });
    await newTestimonial.save();
    res.status(201).json({ message: "Testimonial submitted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while submitting the testimonial." });
  }
});

// Route to fetch all testimonials
router.get("/all", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving testimonials." });
  }
});

module.exports = router;
