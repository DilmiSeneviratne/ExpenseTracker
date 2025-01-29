const Joi = require("joi");

const userValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "any.required": "Username is required",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username must be at most 30 characters",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string()
    .min(8)
    .max(50)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/) // Enforces at least one letter and one number
    .required()
    .messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password must be at most 50 characters",
      "string.pattern.base":
        "Password must include at least one letter and one number",
    }),
  profilePicture: Joi.string().uri().allow("").messages({
    "string.uri": "Profile picture must be a valid URL",
  }),
});

module.exports = userValidationSchema;
