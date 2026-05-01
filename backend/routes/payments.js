const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Transaction = require("../models/Transaction");

router.get("/upcoming", auth, async (req, res) => {
  // Transactions due today or upcoming
  const accounts = await Transaction.find({
    userId: req.userId,
    status: "To Pay",
    dueDate: { $gte: new Date() },
  })
    .sort({ dueDate: 1 })
    .lean();
  // Optionally format for dueLabel
  accounts.forEach((acc) => {
    const date = new Date(acc.dueDate);
    acc.dueLabel = `${date.toLocaleDateString()}${
      date.toDateString() === new Date().toDateString() ? " (Today)" : ""
    }`;
  });
  res.json({ accounts });
});

router.get("/outstanding", auth, async (req, res) => {
  // Transactions overdue
  const accounts = await Transaction.find({
    userId: req.userId,
    status: "To Pay",
    dueDate: { $lt: new Date() },
  })
    .sort({ dueDate: 1 })
    .lean();
  accounts.forEach((acc) => {
    const lateDays = Math.round(
      (new Date() - new Date(acc.dueDate)) / (1000 * 60 * 60 * 24)
    );
    acc.lateLabel = `${lateDays} days late`;
  });
  res.json({ accounts });
});

router.get("/transactions", auth, async (req, res) => {
  // Transactions paid
  const transactions = await Transaction.find({
    userId: req.userId,
    status: "Paid",
  })
    .sort({ date: -1 })
    .lean();
  transactions.forEach((txn) => {
    txn.interest = txn.interestRate || 0; // Example field
  });
  res.json({ transactions });
});

module.exports = router;
