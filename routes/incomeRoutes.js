const express = require("express");
const router = express.Router();
const Income = require("../models/income"); // Import income model

// Add a new income
router.post("/add", async (req, res) => {
  const { userId, amount, category, date, description } = req.body;
  try {
    const newIncome = new Income({
      userId,
      amount,
      category,
      date,
      description,
    });
    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome);
  } catch (error) {
    res.status(500).json({ message: "Error adding income", error });
  }
});

// Update an income
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { amount, category, date, description } = req.body;
  try {
    const updatedIncome = await Income.findByIdAndUpdate(
      id,
      { amount, category, date, description },
      { new: true } // Return the updated document
    );
    if (!updatedIncome)
      return res.status(404).json({ message: "Income not found" });
    res.status(200).json(updatedIncome);
  } catch (error) {
    res.status(500).json({ message: "Error updating income", error });
  }
});

// Delete an income
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedIncome = await Income.findByIdAndDelete(id);
    if (!deletedIncome)
      return res.status(404).json({ message: "Income not found" });
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting income", error });
  }
});

// Fetch all incomes for a user
router.get("/all/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 }); // Sort by date (newest first)
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching incomes", error });
  }
});

module.exports = router;
