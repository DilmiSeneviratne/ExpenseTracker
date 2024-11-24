const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to the user
    name: { type: String, required: true }, // Category name
    type: { type: String, enum: ["income", "expense"], required: true }, // Type of category
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
