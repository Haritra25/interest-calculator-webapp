import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTransaction() {
  const [form, setForm] = useState({
    name: "",
    amount: "",
    interestRate: "",
    interestType: "Simple",
    dueDate: "",
    givenOrTaken: "Given",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/transactions/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      if (response.ok) {
        navigate("/homepage");
      } else {
        setError(data.message || "Failed to add transaction");
      }
    } catch {
      setError("Failed to add transaction");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fd",
        padding: 20,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 410,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0px 4px 32px 0 rgba(93,95,239,0.08)",
          padding: "44px 36px 32px 36px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
        autoComplete="off"
      >
        <h2
          style={{
            marginBottom: 8,
            fontWeight: 700,
            fontSize: 28,
            color: "#232743",
            textAlign: "center",
          }}
        >
          Add Transaction
        </h2>
        <label
          htmlFor="name"
          style={{ fontWeight: 500, fontSize: 16, color: "#232743" }}
        >
          Name
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Recipient (e.g. John Doe)"
            required
            style={{
              marginTop: 6,
              width: "100%",
              padding: "12px 13px",
              border: "1px solid #d9dbeb",
              borderRadius: 8,
              fontSize: 16,
              outline: "none",
              transition: "border-color 0.2s",
            }}
          />
        </label>
        <label
          htmlFor="amount"
          style={{ fontWeight: 500, fontSize: 16, color: "#232743" }}
        >
          Amount
          <input
            type="number"
            name="amount"
            id="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="₹ Amount"
            min="0"
            required
            style={{
              marginTop: 6,
              width: "100%",
              padding: "12px 13px",
              border: "1px solid #d9dbeb",
              borderRadius: 8,
              fontSize: 16,
              outline: "none",
            }}
          />
        </label>
        <div style={{ display: "flex", gap: 16 }}>
          <label
            style={{ flex: 1, fontWeight: 500, fontSize: 16, color: "#232743" }}
          >
            Interest Rate (%)
            <input
              type="number"
              name="interestRate"
              value={form.interestRate}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.01"
              placeholder="e.g. 7.5"
              required
              style={{
                marginTop: 6,
                width: "100%",
                padding: "12px 13px",
                border: "1px solid #d9dbeb",
                borderRadius: 8,
                fontSize: 16,
                outline: "none",
              }}
            />
          </label>
          <label
            style={{ flex: 1, fontWeight: 500, fontSize: 16, color: "#232743" }}
          >
            Interest Type
            <select
              name="interestType"
              value={form.interestType}
              onChange={handleChange}
              style={{
                marginTop: 6,
                width: "100%",
                padding: "12px 13px",
                border: "1px solid #d9dbeb",
                borderRadius: 8,
                fontSize: 16,
                background: "#fff",
              }}
            >
              <option value="Simple">Simple</option>
              <option value="Compound">Compound</option>
            </select>
          </label>
        </div>
        <label
          htmlFor="dueDate"
          style={{ fontWeight: 500, fontSize: 16, color: "#232743" }}
        >
          Due Date
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            required
            style={{
              marginTop: 6,
              width: "100%",
              padding: "12px 13px",
              border: "1px solid #d9dbeb",
              borderRadius: 8,
              fontSize: 16,
              outline: "none",
            }}
          />
        </label>
        <label
          htmlFor="givenOrTaken"
          style={{ fontWeight: 500, fontSize: 16, color: "#232743" }}
        >
          Type
          <select
            name="givenOrTaken"
            id="givenOrTaken"
            value={form.givenOrTaken}
            onChange={handleChange}
            style={{
              marginTop: 6,
              width: "100%",
              padding: "12px 13px",
              border: "1px solid #d9dbeb",
              borderRadius: 8,
              fontSize: 16,
              background: "#fff",
            }}
          >
            <option value="Given">Given</option>
            <option value="Taken">Taken</option>
          </select>
        </label>
        {error && (
          <div
            style={{
              color: "#e84d4f",
              background: "#ffeaea",
              borderRadius: 6,
              padding: "10px 14px",
              fontWeight: 500,
              marginTop: 2,
              marginBottom: -12,
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            background: "#5D5FEF",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "15px 0",
            fontWeight: 700,
            letterSpacing: 1,
            fontSize: 18,
            marginTop: 16,
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#4a4eda")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#5D5FEF")
          }
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}
