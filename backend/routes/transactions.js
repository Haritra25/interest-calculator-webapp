const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction"); // Adjust path if needed
const auth = require("../middleware/auth"); // Use correct path to your middleware

// Add a new transaction
router.post("/add", auth, async (req, res) => {
  try {
    const { name, amount, dueDate, interestRate, interestType, givenOrTaken } =
      req.body;
    // Status should match whatever your homepage looks for (usually "To Pay")
    const txn = new Transaction({
      userId: req.userId,
      name,
      amount,
      dueDate,
      interestRate,
      interestType,
      givenOrTaken,
      status: "To Pay",
    });
    await txn.save();
    res.status(201).json({ message: "Transaction added" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add transaction" });
  }
});

// Example of other protected route usage
router.get("/some-protected-route", auth, async (req, res) => {
  // req.userId is available here
  res.json({ message: `Authenticated! UserId: ${req.userId}` });
});

module.exports = router;
