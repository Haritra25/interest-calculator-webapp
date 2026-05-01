import React, { useEffect, useState } from "react";
import TopNavBar from "../components/TopNavBar";
import Header from "../components/Header"; // You can use your existing header.

const TAB_LIST = ["Upcoming", "Outstanding", "Transactions"];

export default function Money() {
  const [tab, setTab] = useState(0); // 0: Upcoming, 1: Outstanding, 2: Transactions
  const [accounts, setAccounts] = useState([]); // For Upcoming/Outstanding
  const [transactions, setTransactions] = useState([]); // For Transactions tab
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchTabData = async () => {
      try {
        let url = "";
        if (tab === 0) url = "http://localhost:5000/api/money/upcoming";
        else if (tab === 1) url = "http://localhost:5000/api/money/outstanding";
        else url = "http://localhost:5000/api/money/transactions";
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (tab < 2)
          setAccounts(Array.isArray(data.accounts) ? data.accounts : []);
        else
          setTransactions(
            Array.isArray(data.transactions) ? data.transactions : []
          );
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchTabData();
  }, [tab, token]);

  // Card renderer for Upcoming/Outstanding
  const renderAccountCard = (acc) => (
    <div
      key={acc._id}
      style={{
        display: "flex",
        alignItems: "center",
        background: "#fff",
        borderRadius: 13,
        padding: "10px 14px",
        marginBottom: 16,
        boxShadow: "0 1px 8px #e5e9f570",
        justifyContent: "space-between",
        minHeight: 57,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={
            acc.profilePic || "https://randomuser.me/api/portraits/men/1.jpg"
          }
          alt={acc.name}
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: 12,
            border: "2px solid #fafafa",
          }}
        />
        <div>
          <div style={{ fontWeight: 600, fontSize: 15, color: "#232743" }}>
            {acc.name}
          </div>
          <div style={{ fontWeight: 400, fontSize: 12, color: "#8990ae" }}>
            {tab === 0 ? `${acc.dueLabel}` : acc.lateLabel || ""}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "right", minWidth: 110, flexShrink: 0 }}>
        <span
          style={{
            color: acc.status === "To Pay" ? "#e84d4f" : "#8a8a9e",
            background: acc.status === "To Pay" ? "#ffeaea" : "#efefef",
            borderRadius: 7,
            padding: "2.8px 13px",
            fontWeight: 500,
            fontSize: 13,
            marginBottom: 4,
            display: "inline-block",
          }}
        >
          {acc.status}
        </span>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#5271ff" }}>
          ₹ {acc.amount}
        </div>
      </div>
    </div>
  );

  // Transactions Tab
  const renderTransactionRow = (txn) => (
    <div
      key={txn._id}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        borderRadius: 12,
        marginBottom: 13,
        boxShadow: "0 1px 6px #e5e9f570",
        padding: "10px 18px",
      }}
    >
      <div>
        <div style={{ color: "#e84d4f", fontWeight: 600, marginBottom: 5 }}>
          Paid to {txn.name}
        </div>
        <div style={{ color: "#8990ae", fontWeight: 500, fontSize: 13 }}>
          Interest ₹ {txn.interest}
        </div>
      </div>
      <div style={{ textAlign: "right", fontSize: 13 }}>
        {txn.date ? new Date(txn.date).toLocaleDateString() : "--"}
        <br />
        <span style={{ color: "#5271ff", fontWeight: 600, cursor: "pointer" }}>
          Edit
        </span>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#eef0f9", minHeight: "100vh" }}>
      <Header />
      <TopNavBar />
      <div
        style={{
          maxWidth: 430,
          margin: "28px auto",
          borderRadius: 18,
          background: "#e8ebfc",
          boxShadow: "0 2px 11px #e5e9f5",
          padding: "16px 14px 26px 14px",
        }}
      >
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {TAB_LIST.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              style={{
                flex: 1,
                background: tab === i ? "#5271ff" : "#f7f8fc",
                color: tab === i ? "#fff" : "#5271ff",
                fontWeight: 600,
                border: "none",
                fontSize: 14,
                borderRadius: "9px 9px 0 0",
                padding: "11px 0",
                cursor: "pointer",
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div
          style={{
            fontWeight: 600,
            marginBottom: 16,
            color: "#232743",
            fontSize: 15,
          }}
        >
          Accounts
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : tab < 2 ? (
          accounts.length ? (
            accounts.map((acc) => renderAccountCard(acc))
          ) : (
            <p>No accounts found.</p>
          )
        ) : transactions.length ? (
          transactions.map((txn) => renderTransactionRow(txn))
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </div>
  );
}
