const Joi = require("joi");

const allowedCategories = [
  "Salary",
  "Freelance",
]; // Define your dropdown categories

const incomeValidationSchema = Joi.object({
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Validate MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "Invalid user ID format",
      "any.required": "User ID is required",
    }),
  incomeName: Joi.string().min(3).max(100).required().messages({
    "string.base": "Income name must be a string",
    "string.min": "Income name must be at least 3 characters",
    "string.max": "Income name cannot exceed 100 characters",
    "any.required": "Income name is required",
  }),
  amount: Joi.number().positive().required().messages({
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be a positive number",
    "any.required": "Amount is required",
  }),
  category: Joi.string()
    .valid(...allowedCategories)
    .required()
    .messages({
      "any.only": "Invalid Category",
      "any.required": "Category is required",
    }),
  date: Joi.date().less("now").required().messages({
    "date.base": "Date must be a valid date",
    "date.less": "Date cannot be in the future",
    "any.required": "Date is required",
  }),
  description: Joi.string().max(500).optional().messages({
    "string.max": "Description cannot exceed 500 characters",
  }),
});

module.exports = incomeValidationSchema;
