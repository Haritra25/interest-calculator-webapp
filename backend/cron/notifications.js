const cron = require("node-cron");
const twilio = require("twilio");
const Transaction = require("../models/Transaction");

const client = new twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

cron.schedule("0 9 * * *", async () => {
  // Daily at 9 AM
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dueTxns = await Transaction.find({
    date: {
      $gte: tomorrow.setHours(0, 0, 0, 0),
      $lt: tomorrow.setHours(23, 59, 59, 999),
    },
    status: "To Pay",
  });

  for (const txn of dueTxns) {
    try {
      await client.messages.create({
        body: `Reminder: Payment of ₹${txn.amount} due for ${txn.name} tomorrow.`,
        from: process.env.TWILIO_PHONE,
        to: txn.contact,
      });
    } catch (e) {
      console.error("Failed to send SMS for transaction:", txn._id, e);
    }
  }
});
