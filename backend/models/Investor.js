// models/Investor.js
const mongoose = require("mongoose");
const investorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  profilePic: { type: String, default: "" },
  type: { type: String, default: "Investor" },
});
module.exports = mongoose.model("Investor", investorSchema);
