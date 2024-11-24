const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to the user
    amount: { type: Number, required: true }, // Amount of expense
    category: { type: String, required: true }, // Category of expense
    date: { type: Date, required: true }, // Date of expense
    description: { type: String, default: "" }, // Optional description
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
