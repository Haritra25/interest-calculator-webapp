// backend/routes/profile.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.userId).lean();
  res.json({ user });
});

router.put("/", auth, async (req, res) => {
  const { name, profilePic } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (name) user.name = name;
    if (typeof profilePic === "string") user.profilePic = profilePic;
    await user.save();
    res.json({ user, message: "Profile updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
});

module.exports = router;
