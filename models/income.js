const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to the user
    incomeName: { type: String, required: false }, // New field
    amount: { type: Number, required: true }, // Amount of income
    category: { type: String, required: true }, // Category of income
    date: { type: Date, required: true }, // Date of income
    description: { type: String, default: "" }, // Optional description
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

const Income = mongoose.model("Income", incomeSchema);
module.exports = Income;
