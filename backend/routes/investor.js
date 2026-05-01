const express = require("express");
const router = express.Router();
const Investor = require("../models/Investor");
const auth = require("../middleware/auth");

// Add new investor
router.post("/add", auth, async (req, res) => {
  try {
    const { name, phone, address, profilePic } = req.body;
    if (!name || !phone || !address)
      return res.status(400).json({ message: "All fields are required." });
    const investor = new Investor({
      userId: req.userId,
      name,
      phone,
      address,
      profilePic,
    });
    await investor.save();
    res.status(201).json({ message: "Investor added successfully." });
  } catch (e) {
    res.status(500).json({ message: "Failed to add investor." });
  }
});

// List all for user
router.get("/list", auth, async (req, res) => {
  try {
    const investors = await Investor.find({ userId: req.userId });
    res.json({ investors });
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch investors." });
  }
});

module.exports = router;
