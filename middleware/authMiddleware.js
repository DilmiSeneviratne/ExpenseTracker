const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  // Check if token is present
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    // Extract token from "Bearer <token>" format
    const extractedToken = token.split(" ")[1];

    // Verify token using JWT_SECRET
    const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);

    // Attach user ID to the request object for later use
    req.user = decoded.id;

    // Proceed to the next middleware
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
