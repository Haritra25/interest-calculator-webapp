const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User"); // Adjust path if needed
const bcrypt = require("bcrypt"); // Use for secure password checks

// Signup route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists." });
    const hash = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hash });
    await user.save();
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password." });
    // Compare hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ message: "Invalid email or password." });
    // Sign JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// JWT middleware
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Token is not valid." });
  }
}

// Protected dashboard route
router.get("/dashboard", requireAuth, async (req, res) => {
  // TODO: Replace with real user-based data fetch
  res.json({
    readyToRedeem: 50000,
    totalRedeem: 20000,
    paymentsDue: [],
    investorPerformance: [],
  });
});

module.exports = router;
