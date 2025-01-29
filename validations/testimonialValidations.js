const Joi = require("joi");

const testimonialValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "any.required": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must be at most 100 characters",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),
  message: Joi.string().max(500).required().messages({
    "any.required": "Message is required",
    "string.max": "Message must be at most 500 characters",
  }),
});

module.exports = testimonialValidationSchema;
