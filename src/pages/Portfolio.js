import React, { useState, useEffect } from "react";
import { api } from "../api";
import Header from "../components/Header";
import TopNavBar from "../components/TopNavBar";

export default function Portfolio() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/portfolio", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load portfolio data.");
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  if (loading) return <div>Loading portfolio...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  // --- Render the REACT layout similar to your design ---
  return (
    <>
      <Header />
      <TopNavBar />
      <div style={{ maxWidth: 470, margin: "0 auto", padding: 18 }}>
        <div
          style={{
            borderRadius: 18,
            background: "#F1F5FA",
            padding: 14,
            marginBottom: 22,
          }}
        >
          <h2 style={{ margin: 0 }}>Portfolio</h2>
          <input
            type="text"
            placeholder="Search name, keyword..."
            style={{
              width: "100%",
              margin: "16px 0",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #d1d8ed",
            }}
          />
        </div>

        <div
          style={{
            borderRadius: 18,
            background: "#fff",
            padding: 18,
            marginBottom: 22,
            boxShadow: "0 2px 12px #bdbdbd18",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <label style={{ color: "#818FA0", fontSize: 13 }}>
                Available amount
              </label>
              <div style={{ fontWeight: 700, color: "#51A654", fontSize: 20 }}>
                ₹ {data.availableAmount?.toLocaleString()}
              </div>
            </div>
            <div>
              <label style={{ color: "#818FA0", fontSize: 13 }}>
                Total dept taken
              </label>
              <div style={{ fontWeight: 600, color: "#E84D4F", fontSize: 18 }}>
                ₹ {data.totalDebtTaken?.toLocaleString()}
              </div>
            </div>
          </div>
          <div style={{ margin: "14px 0" }}>
            <button
              style={{
                background: "#5D5FEF",
                borderRadius: 10,
                color: "#fff",
                border: "none",
                padding: "8px 22px",
                fontWeight: 600,
                marginRight: 12,
              }}
            >
              View history
            </button>
            <button
              style={{
                background: "#EFF0F6",
                borderRadius: 10,
                color: "#5D5FEF",
                border: "none",
                padding: "8px 22px",
                fontWeight: 600,
              }}
            >
              All time
            </button>
          </div>
        </div>

        {/* Payments due section */}
        <div
          style={{
            borderRadius: 16,
            marginBottom: 22,
            background: "#fff",
            padding: 15,
          }}
        >
          <label style={{ color: "#818FA0", fontWeight: 700 }}>
            Payments due
          </label>
          <div style={{ margin: "10px 0 5px 0" }}>
            {/* Replace with a chart library for donut if wanted */}
            <strong>Interest Paid:</strong> {data.interestPaidPercent || 0}%
            <br />
            Paid amount: ₹{data.paidAmount || 0} / ₹{data.totalAmount || 0}
            <br />
            To Pay:{" "}
            <span style={{ color: "#E84D4F", fontWeight: 700 }}>
              ₹{data.toPayAmount || 0}
            </span>
          </div>
          <div style={{ margin: "10px 0" }}>
            {data.paymentsDue &&
              data.paymentsDue.slice(0, 4).map((p) => (
                <span
                  key={p._id}
                  style={{
                    display: "inline-block",
                    marginRight: 8,
                    fontSize: 14,
                  }}
                >
                  {p.name} ₹{p.amount}
                </span>
              ))}
          </div>
          <a href="/investor-performance" style={{ color: "#5D5FEF" }}>
            View investor performance
          </a>
        </div>

        {/* Investor Contribution */}
        <div
          style={{
            borderRadius: 16,
            marginBottom: 22,
            background: "#fff",
            padding: 15,
          }}
        >
          <label style={{ color: "#818FA0", fontWeight: 600, marginBottom: 7 }}>
            Investor Contribution
          </label>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#51A654" }}>
            ₹ {data.totalInvestment?.toLocaleString()}
          </div>
          <ul>
            {data.investorContributions?.map((inv) => (
              <li key={inv.name} style={{ color: inv.color, fontWeight: 600 }}>
                {inv.name} ₹{inv.amount} ({inv.percent}%)
              </li>
            ))}
          </ul>
        </div>

        {/* Investor Performance */}
        <div style={{ borderRadius: 16, background: "#fff", padding: 15 }}>
          <label style={{ color: "#818FA0", fontWeight: 600 }}>
            Investor Performance
          </label>
          <ul>
            {data.investorPerformance?.map((inv) => (
              <li
                key={inv.name}
                style={{
                  borderBottom: "1px solid #eee",
                  marginBottom: 12,
                  paddingBottom: 7,
                }}
              >
                <div style={{ fontWeight: 600 }}>
                  {inv.name}:{" "}
                  <span style={{ color: "#51A654" }}>₹{inv.amount}</span>
                </div>
                <div>Date: {inv.date}</div>
                <div>
                  Rate: {inv.rate}% ({inv.count})
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
