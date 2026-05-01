import React from "react";

const accounts = [
  {
    name: "Suresh Prabha",
    date: "03.07.2024",
    interest: "1.5% (3K)",
    amount: 200000,
  },
  {
    name: "Jagrati Thakur",
    date: "03.07.2024",
    interest: "3.0% (5K)",
    amount: 100000,
  },
  { name: "Shiva", date: "03.07.2024", interest: "2.0% (4K)", amount: 100000 },
];

export default function AccountsPanel({ data = accounts }) {
  return (
    <section
      style={{
        background: "#fff",
        borderRadius: 20,
        boxShadow: "0 2px 8px #7286D311",
        padding: "2rem",
        margin: "2rem 0",
      }}
    >
      <h2
        style={{
          color: "#5D5FEF",
          fontWeight: 700,
          fontSize: 24,
          marginBottom: 18,
        }}
      >
        Investor Performance
      </h2>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {data.map((acc, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 18,
              borderBottom: i < data.length - 1 ? "1px solid #F1F1F1" : "none",
              paddingBottom: i < data.length - 1 ? 18 : 0,
            }}
          >
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{acc.name}</div>
              <div style={{ fontSize: 13, color: "#888" }}>
                {acc.date} {acc.interest}
              </div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, color: "#5D5FEF" }}>
              ₹ {acc.amount.toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
