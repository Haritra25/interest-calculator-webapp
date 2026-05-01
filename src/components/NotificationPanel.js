import React from "react";

export default function NotificationPanel() {
  return (
    <section
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 8px #7286D311",
        padding: "1.25rem 2rem",
        margin: "2rem 0",
      }}
    >
      <h2
        style={{
          color: "#5D5FEF",
          fontWeight: 700,
          fontSize: 22,
          marginBottom: 18,
        }}
      >
        Notifications
      </h2>
      <div style={{ fontSize: 16, color: "#333" }}>
        <p>Payments Due</p>
        <p>
          <span style={{ color: "#C44737", fontWeight: 600 }}>
            Jagrati Thakur
          </span>{" "}
          has a payment due <span style={{ fontWeight: 600 }}>Tomorrow</span>
        </p>
        <p>
          <span style={{ color: "#C44737", fontWeight: 600 }}>
            Suresh Prabha
          </span>{" "}
          has a payment due <span style={{ fontWeight: 600 }}>Today</span>
        </p>
        {/* Populate dynamically as needed */}
      </div>
    </section>
  );
}
