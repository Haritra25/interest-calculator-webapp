const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();

router.get("/today", async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const duePayments = await Transaction.find({
      date: { $gte: todayStart, $lte: todayEnd },
      status: "To Pay",
    });

    // Notifications include text and optional links (e.g., to payment page)
    const notifications = duePayments.map((txn) => ({
      text: `${txn.name} has a payment of ₹${txn.amount} due today.`,
      url: `/payments`, // Customize link to wherever relevant in frontend
    }));

    res.json({ notifications });
  } catch (err) {
    res.status(500).send("Failed to fetch notifications");
  }
});

module.exports = router;
