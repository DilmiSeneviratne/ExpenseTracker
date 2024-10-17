const User = require("../models/user");
const Transaction = require("../models/Transaction");
const router = express.Router();
const express = require("express");

//Create Transaction
router.post("/add", async (req, res) => {
  const { user, type, amount, category, date } = req.body;

  try {
    const newTransaction = new Transaction({
      user,
      type,
      amount,
      category,
      date,
    });
    await newTransaction.save();
    res.status(201).json({ message: "Transaction added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read All Transactions
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await Transaction.find({ user: userId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit Transaction
router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { type, amount, category, date } = req.body;

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { type, amount, category, date },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res
      .status(200)
      .json({
        message: "Transaction updated",
        transaction: updatedTransaction,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Transaction
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
