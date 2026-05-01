const mongoose = require("mongoose");

const myAccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  phone: { type: String },
  img: { type: String },
  type: { type: String, default: "Customer" },
});

module.exports = mongoose.model("MyAccount", myAccountSchema);
