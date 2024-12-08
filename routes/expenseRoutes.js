const express = require('express');
const router = express.Router();
const Expense = require("../models/expense"); // Import expense model
const mongoose = require("mongoose"); // Import mongoose


// Add a new expense
router.post('/add', async (req, res) => {
    const { userId, expenseName, amount, category, date, description } = req.body;
    try {
        const newExpense = new Expense({ userId, expenseName, amount, category, date, description });
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error });
    }
});

// Update an expense
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { expenseName, amount, category, date, description } = req.body;
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            id,
            { expenseName, amount, category, date, description },
            { new: true } // Return the updated document
        );
        if (!updatedExpense) return res.status(404).json({ message: 'Expense not found' });
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: 'Error updating expense', error });
    }
});

// Delete an expense
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) return res.status(404).json({ message: 'Expense not found' });
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting expense', error });
    }
});

// Fetch all expenses for a user
router.get('/all/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 }); // Sort by date (newest first)
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error });
    }
});

// Calculate total income for the current month
router.get("/total/current-month/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // Get the first and last dates of the current month
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    // Fetch incomes within the current month for the user
    const expenses = await Expense.find({
      userId,
      date: { $gte: startOfMonth, $lte: endOfMonth }, // Filter by date range
    });

    // Calculate the total income
    const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

    res.status(200).json({ totalExpense });
  } catch (error) {
    res.status(500).json({ message: "Error calculating total expense", error });
  }
});

// Get Monthly Expenses
router.get("/monthly/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const currentYear = new Date().getFullYear();

    // Aggregate expenses grouped by month for the current year
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

    // Create an array of months (1-12) with default values of 0
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      totalExpense: 0,
    }));

    // Merge the aggregated data with the months array
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
    // Get the current month and year
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Query to fetch top 5 expenses for the user in the current month
    const topExpenses = await Expense.find({
      userId: userId,
      date: {
        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth,
      },
    })
      .sort({ amount: -1 }) // Sort by amount in descending order
      .limit(5); // Limit to top 5

    res.status(200).json({
      success: true,
      data: topExpenses,
    });
  } catch (error) {
    console.error("Error fetching top expenses:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching top expenses",
    });
  }
});

// Endpoint to fetch daily expenses for the current month
router.get("/daily-expenses/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Query expenses for the given user within the current month's date range
    const expenses = await Expense.find({
      userId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    // Format data: Map dates to daily expenses
    const dailyExpenses = {};
    expenses.forEach((expense) => {
      const dateKey = expense.date.toISOString().split("T")[0]; // Extract date in YYYY-MM-DD format
      if (dailyExpenses[dateKey]) {
        dailyExpenses[dateKey] += expense.amount;
      } else {
        dailyExpenses[dateKey] = expense.amount;
      }
    });

    // Transform data into arrays
    const dates = Object.keys(dailyExpenses);
    const amounts = Object.values(dailyExpenses);

    res.status(200).json({ dates, amounts });
  } catch (error) {
    console.error("Error fetching daily expenses:", error);
    res.status(500).json({ error: "Failed to fetch daily expenses" });
  }
});

module.exports = router;