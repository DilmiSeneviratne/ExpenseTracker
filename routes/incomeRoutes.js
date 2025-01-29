const express = require("express");
const router = express.Router();
const Income = require("../models/income"); // Import income model
const mongoose = require("mongoose"); // Import mongoose
const incomeValidationSchema = require("../validations/incomeValidations"); // Import validation schema

// Add a new income
router.post("/add", async (req, res) => {
  try {
    // Validate the request body
    const { error } = incomeValidationSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { userId, incomeName, amount, category, date, description } =
      req.body;

    const newIncome = new Income({
      userId,
      incomeName,
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
  try {
    const { id } = req.params;

    // Validate the request body
    const { error } = incomeValidationSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { incomeName, amount, category, date, description } = req.body;

    const updatedIncome = await Income.findByIdAndUpdate(
      id,
      { incomeName, amount, category, date, description },
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

// Calculate total income for the current month
router.get("/total/current-month/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );

    const incomes = await Income.find({
      userId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const totalIncome = incomes.reduce(
      (total, income) => total + income.amount,
      0
    );

    res.status(200).json({ totalIncome });
  } catch (error) {
    res.status(500).json({ message: "Error calculating total income", error });
  }
});

// Get Monthly Income
router.get("/monthly/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const currentYear = new Date().getFullYear();

    const incomeData = await Income.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$date" } },
          totalIncome: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      totalIncome: 0,
    }));

    incomeData.forEach((record) => {
      months[record._id.month - 1].totalIncome = record.totalIncome;
    });

    res.status(200).json({
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      values: months.map((m) => m.totalIncome),
    });
  } catch (error) {
    console.error("Error fetching monthly income:", error);
    res.status(500).json({ error: "Failed to fetch monthly income" });
  }
});

module.exports = router;
