import React, { useState, useEffect } from "react";
import TopNavBar from "../components/TopNavBar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setDashboard({ error: "You are not logged in. Please login again." });
      setLoading(false);
      return;
    }
    fetch("http://localhost:5000/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDashboard(data);
      })
      .catch(() => {
        setDashboard({ error: "Failed to fetch dashboard data." });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (dashboard?.error) return <div>{dashboard.error}</div>;

  return (
    <div
      style={{ background: "#EAEDFB", minHeight: "100vh", paddingBottom: 80 }}
    >
      <Header />
      <TopNavBar />
      <div
        style={{
          maxWidth: 470,
          margin: "0 auto",
          background: "#F3F6FC",
          borderRadius: 32,
          padding: 22,
          boxShadow: "0 2px 16px #7286D340",
        }}
      >
        {/* Ready to Redeem */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 18,
            marginBottom: 22,
            boxShadow: "0 1px 4px #D1D1D110",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ color: "#888", fontSize: 13, marginBottom: 2 }}>
            Available amount
          </span>
          <div
            style={{
              color: "#51A654",
              fontWeight: 700,
              fontSize: 23,
              marginBottom: 5,
            }}
          >
            ₹{" "}
            {dashboard.readyToRedeem !== undefined
              ? dashboard.readyToRedeem.toLocaleString()
              : "--"}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#5D5FEF", fontSize: 14 }}>
              Total redeem: ₹{" "}
              {dashboard.totalRedeem !== undefined
                ? dashboard.totalRedeem.toLocaleString()
                : "--"}
            </span>
            <button
              style={{
                background: "#5D5FEF",
                color: "#fff",
                border: "none",
                borderRadius: 15,
                padding: "7px 21px",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Redeem Now
            </button>
            <span
              style={{
                color: "#5D5FEF",
                fontSize: 13,
                marginLeft: 10,
                cursor: "pointer",
              }}
            >
              View history
            </span>
          </div>
        </div>

        {/* Payments Due */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontWeight: 600, marginBottom: 9, color: "#222" }}>
            Payments Due
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
            {dashboard.paymentsDue && dashboard.paymentsDue.length > 0 ? (
              dashboard.paymentsDue.map((pay, i) => {
                // Format date as 'Today', 'Tomorrow', or 'DD/MM'
                const dueDate = new Date(pay.dueDate);
                const now = new Date();
                let dayLabel = "";
                if (
                  dueDate.getDate() === now.getDate() &&
                  dueDate.getMonth() === now.getMonth() &&
                  dueDate.getFullYear() === now.getFullYear()
                ) {
                  dayLabel = "Today";
                } else if (
                  dueDate.getDate() === now.getDate() + 1 &&
                  dueDate.getMonth() === now.getMonth() &&
                  dueDate.getFullYear() === now.getFullYear()
                ) {
                  dayLabel = "Tomorrow";
                } else {
                  dayLabel = dueDate.toLocaleDateString();
                }
                const amountColor =
                  pay.status === "pending" ? "#E84D4F" : "#888";
                return (
                  <div key={i} style={{ textAlign: "center" }}>
                    <img
                      src={pay.profilePic}
                      alt={pay.name}
                      style={{
                        width: 47,
                        height: 47,
                        borderRadius: 50,
                        objectFit: "cover",
                        marginBottom: 2,
                        border: "2px solid #fff",
                        boxShadow: "0 2px 7px #b0b0b055",
                      }}
                    />
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 13,
                        color: amountColor,
                        marginBottom: 1,
                      }}
                    >
                      ₹ {pay.amount}
                    </div>
                    <div
                      style={{
                        color: "#5D5FEF",
                        fontWeight: 500,
                        fontSize: 12,
                      }}
                    >
                      {dayLabel}
                    </div>
                  </div>
                );
              })
            ) : (
              <span style={{ color: "#aaa", fontSize: 13 }}>
                No payments due
              </span>
            )}
          </div>
        </div>

        {/* Add Transactions Button */}
        <button
          style={{
            width: "100%",
            background: "#5D5FEF",
            color: "#fff",
            border: "none",
            borderRadius: 20,
            fontWeight: 700,
            padding: "16px 0",
            fontSize: 18,
            marginBottom: 30,
            marginTop: 22,
          }}
          onClick={() => navigate("/addtransaction")}
        >
          + Add Transactions
        </button>

        {/* Investor Performance */}
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: 18,
            marginBottom: 22,
            boxShadow: "0 1px 5px #d1d8ed21",
          }}
        >
          <div style={{ fontWeight: 600, color: "#222", marginBottom: 6 }}>
            Investor Performance
          </div>
          {dashboard.investorPerformance &&
          dashboard.investorPerformance.length > 0 ? (
            dashboard.investorPerformance.map((inv, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 11,
                }}
              >
                <img
                  src={inv.img}
                  alt=""
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 50,
                    objectFit: "cover",
                    marginRight: 12,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      color: "#3649ca",
                      marginBottom: 2,
                    }}
                  >
                    {inv.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#acacac" }}>
                    {inv.date}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700 }}>₹ {inv.amount}</div>
                  <div style={{ fontSize: 11, color: "#8fadc7" }}>
                    {inv.rate}% ({inv.count})
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span style={{ color: "#aaa", fontSize: 13 }}>
              No investor performance data
            </span>
          )}
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                color: "#5D5FEF",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              View All
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
