import React, { useState } from "react";
import TopNavBar from "../components/TopNavBar";
import Header from "../components/Header";
import { FiChevronLeft } from "react-icons/fi";

export default function InterestCalculatorPanel() {
  const [amount, setAmount] = useState(100000);
  const [interest, setInterest] = useState(3);
  const [frequency, setFrequency] = useState("Monthly");
  const [type, setType] = useState("Simple Interest");
  const [period, setPeriod] = useState(10);
  // const navigate = useNavigate();

  // Example logic for interest & total
  const netInterest =
    type === "Simple Interest"
      ? (amount * interest * period) / 100
      : amount * (Math.pow(1 + interest / 100, period) - 1);
  const totalPayable = amount + netInterest;

  return (
    <div style={{ background: "#EAEDFB", minHeight: "100vh" }}>
      <Header />
      <TopNavBar />
      <div style={{ maxWidth: 420, margin: "28px auto", position: "relative" }}>
        <div
          style={{
            background: "#F3F6FC",
            borderRadius: 32,
            padding: 28,
            boxShadow: "0 2px 18px #b8bee330",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: 18,
              marginBottom: 25,
            }}
          >
            Interest Calculator
          </div>
          {/* Net Interest summary */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#fff",
              borderRadius: 14,
              padding: "15px 22px",
              marginBottom: 22,
              boxShadow: "0 1px 6px #d5d8ef22",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            <div style={{ color: "#21B956" }}>
              Net interest <br />{" "}
              <span style={{ fontWeight: 700, fontSize: 18 }}>
                ₹ {netInterest.toLocaleString()}
              </span>
            </div>
            <div style={{ color: "#0041C9", fontSize: 14 }}>
              Loan amount
              <br />
              <span style={{ fontWeight: 700, fontSize: 16 }}>₹ {amount}</span>
            </div>
            <div style={{ color: "#F28500", fontSize: 14 }}>
              Total payable
              <br />
              <span style={{ fontWeight: 700, fontSize: 16 }}>
                ₹ {totalPayable.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Period summary */}
          <div
            style={{
              color: "#0ea43a",
              fontSize: 15,
              fontWeight: 500,
              marginBottom: 27,
            }}
          >
            Total period: {period} months
            <span style={{ color: "#8590B1", fontSize: 13 }}>
              {" "}
              ({Math.round(netInterest / period)} / month )
            </span>
          </div>

          {/* Calculator form */}
          <form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <label style={labelStyle}>
              Primary amount
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
            <label style={labelStyle}>
              Interest
              <input
                type="number"
                value={interest}
                onChange={(e) => setInterest(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
            <label style={labelStyle}>
              Interest frequency
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                style={inputStyle}
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </label>
            <label style={labelStyle}>
              Interest type
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={inputStyle}
              >
                <option value="Simple Interest">Simple Interest</option>
                <option value="Compound Interest">Compound Interest</option>
              </select>
            </label>
            <label style={labelStyle}>
              Interest period
              <input
                type="number"
                value={period}
                min={1}
                onChange={(e) => setPeriod(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}

// Inline styles for inputs
const labelStyle = {
  fontSize: 14,
  color: "#3D3C48",
  fontWeight: 500,
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const inputStyle = {
  padding: 8,
  borderRadius: 10,
  border: "1px solid #e1e1ff",
  fontSize: 15,
  outline: "none",
  marginTop: 3,
};
