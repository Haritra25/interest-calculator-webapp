import React from "react";

const demoTransactions = [
  { name: "Shiva", date: "Today", amount: 4000, status: "To Pay" },
  { name: "Deeksha", date: "Today", amount: 3000, status: "To Pay" },
  { name: "Tanishq", date: "Tomorrow", amount: 2000, status: "To Pay" },
  { name: "Kadin", date: "Tomorrow", amount: 4000, status: "To Pay" },
];

export default function TransactionsList({ transactions = demoTransactions }) {
  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h3 style={{ color: "#5D5FEF", fontWeight: 700, fontSize: 20 }}>
          Upcoming Outstanding Transactions
        </h3>
        <button
          style={{
            background: "#5D5FEF",
            color: "#fff",
            borderRadius: 12,
            border: 0,
            padding: "6px 16px",
            fontWeight: 500,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          View All
        </button>
      </div>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {transactions.map((txn, i) => (
          <li
            key={i}
            style={{
              margin: "12px 0",
              padding: "18px 28px",
              border: "1px solid #e2e2e2",
              borderRadius: "14px",
              background: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 1px 4px #BDBDBD22",
            }}
          >
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{txn.name}</div>
              <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>
                {txn.date}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 20, fontWeight: 600 }}>
                ₹ {txn.amount}
              </div>
              <div
                style={{
                  color: txn.status === "To Pay" ? "#C44737" : "#27ae60",
                  fontWeight: 500,
                  fontSize: 13,
                  marginTop: 2,
                }}
              >
                {txn.status}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
