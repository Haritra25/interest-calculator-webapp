require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// Modular route imports
app.use("/api/auth", require("./routes/auth"));
// app.use("/api/auth", authRoutes);
app.use("/api", require("./routes/dashboard"));
app.use("/api", require("./routes/portfolio"));
app.use("/api/payments", require("./routes/payments"));
app.use("/api/accounts", require("./routes/accounts"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/investor", require("./routes/investor"));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
