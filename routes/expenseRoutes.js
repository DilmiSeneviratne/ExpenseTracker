const express = require('express');
const router = express.Router();
const Expense = require("../models/expense"); // Import expense model

// Add a new expense
router.post('/add', async (req, res) => {
    const { userId, amount, category, date, description } = req.body;
    try {
        const newExpense = new Expense({ userId, amount, category, date, description });
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error });
    }
});

// Update an expense
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { amount, category, date, description } = req.body;
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            id,
            { amount, category, date, description },
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

module.exports = router;