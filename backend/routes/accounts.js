const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Investor = require("../models/Investor"); // should include photo, name, phone, address, type
const User = require("../models/User"); // User model should include type, photo etc.

// Fetch Investors (tab 1)
router.get("/investors", auth, async (req, res) => {
  try {
    // Only show investors for this user
    const investors = await Investor.find({ userId: req.userId });
    res.json({ investors });
  } catch (err) {
    res.status(500).json({ error: "Could not fetch investors." });
  }
});

router.post("/investors", auth, async (req, res) => {
  try {
    const { name, phone, address, profilePic } = req.body;
    if (!name || !phone || !address) {
      return res.status(400).json({ message: "All fields required" });
    }
    const investor = new Investor({
      userId: req.userId,
      name,
      phone,
      address,
      profilePic,
    });
    await investor.save();
    res.status(201).json({ message: "Investor added" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add investor" });
  }
});

// Fetch My Accounts (tab 2)
router.get("/myaccounts", auth, async (req, res) => {
  try {
    // For simplicity, return current user as Owner/Customer type
    const user = await User.findById(req.userId);
    res.json({ accounts: [user] });
  } catch (err) {
    res.status(500).json({ error: "Could not fetch user accounts." });
  }
});

module.exports = router;
