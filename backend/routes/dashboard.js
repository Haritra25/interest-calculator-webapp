const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const Investor = require("../models/Investor");
const User = require("../models/User");
const auth = require("../middleware/auth"); // Update path if needed

// Dashboard route
router.get("/dashboard", auth, async (req, res) => {
  try {
    // Ready to Redeem & Total Redeem calculations
    const readyResult = await Transaction.aggregate([
      {
        $match: { userId: req.userId, givenOrTaken: "Taken", status: "To Pay" },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalRedeemResult = await Transaction.aggregate([
      { $match: { userId: req.userId, givenOrTaken: "Taken", status: "Paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const readyToRedeem = readyResult[0]?.total || 0;
    const totalRedeem = totalRedeemResult[0]?.total || 0;

    // Payments Due: get next 4 pending transactions with dueDate >= yesterday
    const paymentsDue = await Transaction.find({
      userId: req.userId,
      status: "To Pay",
      dueDate: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    })
      .sort({ dueDate: 1 })
      .limit(4)
      .lean();

    // For each payment transaction, populate payer's name and profile picture
    const user = await User.findById(req.userId).lean();
    paymentsDue.forEach((txn) => {
      txn.name = user.name; // or txn.payerName if you store it
      txn.profilePic =
        user.profilePicture || "https://randomuser.me/api/portraits/men/1.jpg";
    });

    // Investors + performance
    const investors = await Investor.find({ userId: req.userId })
      .limit(3)
      .lean();
    const investorStats = await Promise.all(
      investors.map(async (investor) => {
        const perf = await Transaction.aggregate([
          { $match: { userId: req.userId, name: investor.name } },
          {
            $group: {
              _id: null,
              totalAmount: { $sum: "$amount" },
              avgRate: { $avg: "$interestRate" },
              loanCount: { $sum: 1 },
            },
          },
        ]);
        return {
          ...investor,
          amount: perf[0]?.totalAmount || 0,
          rate: perf[0]?.avgRate || 0,
          count: perf[0]?.loanCount || 0,
        };
      })
    );

    const userInfo = await User.findById(req.userId);

    res.json({
      username: userInfo?.username || "",
      readyToRedeem,
      totalRedeem,
      paymentsDue,
      investorPerformance: investorStats,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
