const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Transaction = require("../models/Transaction");

router.get("/portfolio", auth, async (req, res) => {
  try {
    // Fetch all investments for the user
    const transactions = await Transaction.find({
      userId: req.userId, // Fetch only this user's records!
      givenOrTaken: "Given", // Or other logic, as needed
    }).lean();
    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
