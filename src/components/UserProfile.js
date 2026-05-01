import React from "react";

export default function UserProfile() {
  return (
    <section
      style={{
        background: "#fff",
        borderRadius: 20,
        boxShadow: "0 2px 8px #7286D311",
        padding: "2rem",
        margin: "2rem 0",
        textAlign: "center",
      }}
    >
      <div
        style={{
          borderRadius: "50%",
          background: "#E1E8FF",
          width: 96,
          height: 96,
          display: "inline-block",
          marginBottom: 16,
        }}
      >
        <span
          role="img"
          aria-label="user"
          style={{
            fontSize: 64,
            lineHeight: "96px",
            display: "block",
          }}
        >
          🧑
        </span>
      </div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>Monica</div>
      <div style={{ fontSize: 15, color: "#888" }}>
        Ready to redeem payments
      </div>
      <div style={{ marginTop: 16, fontWeight: 600 }}>
        Available amount: <span style={{ color: "#5D5FEF" }}>₹ 45,987.15</span>
      </div>
      <div>
        Total redeem:{" "}
        <span style={{ color: "#5D5FEF", fontWeight: 600 }}>₹ 30,000.00</span>{" "}
        <button
          style={{
            marginLeft: 16,
            background: "#5D5FEF",
            color: "#fff",
            border: 0,
            borderRadius: 8,
            padding: "6px 18px",
          }}
        >
          Redeem Now
        </button>
      </div>
    </section>
  );
}
