const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String }, // optional
    address: { type: String }, // optional
    type: { type: String, default: "Customer" },
    profilePic: {
      type: String,
      default: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  },
  { timestamps: true }
);

// Password verification helper
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
