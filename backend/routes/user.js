// const express = require("express");
// const User = require("../models/User");
// const router = express.Router();
// const authMiddleware = require("../middleware/auth");
// const jwt = require("jsonwebtoken");

// function authMiddleware(req, res, next) {
//   const token = req.headers.authorization?.replace("Bearer ", "");
//   if (!token) return res.sendStatus(401);
//   jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
//     if (err) return res.sendStatus(401);
//     req.userId = payload.id;
//     next();
//   });
// }

// // PATCH: update profile
// router.patch("/profile", authMiddleware, async (req, res) => {
//   const { displayName } = req.body;
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.userId,
//       { displayName },
//       { new: true }
//     );
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;

// In your user routes file (e.g., routes/user.js)
const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth"); // your JWT check middleware
const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
