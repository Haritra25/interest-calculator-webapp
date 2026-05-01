const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  interestType: { type: String, required: true },
  dueDate: { type: Date, required: true },
  givenOrTaken: { type: String, enum: ["Given", "Taken"], required: true },
  status: {
    type: String,
    enum: ["pending", "paid", "To Pay", "Paid"],
    default: "pending",
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
