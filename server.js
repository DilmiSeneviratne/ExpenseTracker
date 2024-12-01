const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("API is running");
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error(err));

  // Import Routes
const authRoutes = require("./routes/authRoutes"); // Make sure this path is correct
const incomeRoutes = require("./routes/incomeRoutes"); // Make sure this path is correct

// Use Routes
app.use("/api/auth", authRoutes); // Use "/api/auth" as the base route for authentication
app.use("/api/income", incomeRoutes); 