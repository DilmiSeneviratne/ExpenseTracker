const express = require("express");
const router = express.Router();
const Expense = require("../models/expense");
const mongoose = require("mongoose");
const expenseValidationSchema = require("../validations/expenseValidations");

// Add a new expense
router.post("/add", async (req, res) => {
  try {
    // Validate request body
    const { error, value } = expenseValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Destructure validated data
    const { userId, expenseName, amount, category, date, description } = value;

    const newExpense = new Expense({
      userId,
      expenseName,
      amount,
      category,
      date,
      description,
    });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Error adding expense", error });
  }
});

// Update an expense
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate request body
    const { error, value } = expenseValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Destructure validated data
    const { expenseName, amount, category, date, description } = value;

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { expenseName, amount, category, date, description },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Error updating expense", error });
  }
});

// Delete an expense
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Error deleting expense", error });
  }
});

// Fetch all expenses for a user
router.get("/all/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Error fetching expenses", error });
  }
});

// Calculate total expenses for the current month
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

    const expenses = await Expense.find({
      userId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const totalExpense = expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    res.status(200).json({ totalExpense });
  } catch (error) {
    console.error("Error calculating total expense:", error);
    res.status(500).json({ message: "Error calculating total expense", error });
  }
});

// Get monthly expenses
router.get("/monthly/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const currentYear = new Date().getFullYear();

    const expenseData = await Expense.aggregate([
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
          totalExpense: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      totalExpense: 0,
    }));

    expenseData.forEach((record) => {
      months[record._id.month - 1].totalExpense = record.totalExpense;
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
      values: months.map((m) => m.totalExpense),
    });
  } catch (error) {
    console.error("Error fetching monthly expenses:", error);
    res.status(500).json({ error: "Failed to fetch monthly expenses" });
  }
});

// Route to get the top 5 expenses for the current month
router.get("/top/current-month/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const topExpenses = await Expense.find({
      userId,
      date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
    })
      .sort({ amount: -1 })
      .limit(5);

    res.status(200).json({ success: true, data: topExpenses });
  } catch (error) {
    console.error("Error fetching top expenses:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching top expenses" });
  }
});

// Endpoint to fetch daily expenses for the current month
router.get("/daily-expenses/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const expenses = await Expense.find({
      userId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const dailyExpenses = {};
    expenses.forEach((expense) => {
      const dateKey = expense.date.toISOString().split("T")[0];
      dailyExpenses[dateKey] = (dailyExpenses[dateKey] || 0) + expense.amount;
    });

    const dates = Object.keys(dailyExpenses);
    const amounts = Object.values(dailyExpenses);

    res.status(200).json({ dates, amounts });
  } catch (error) {
    console.error("Error fetching daily expenses:", error);
    res.status(500).json({ error: "Failed to fetch daily expenses" });
  }
});

module.exports = router;
