import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddInvestor() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    type: "Investor",
    profilePic: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/investors/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/accounts");
      } else {
        setError(data.message || "Failed to add investor");
      }
    } catch (e) {
      setError("Failed to add investor");
    }
    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f7fd",
        padding: 20,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          borderRadius: 18,
          padding: "36px 30px 22px 30px",
          boxShadow: "0 3px 24px #bcbcff30",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <h2 style={{ textAlign: "center", fontWeight: 700, color: "#232743" }}>
          Add Investor
        </h2>
        <label style={{ fontWeight: 500, fontSize: 16 }}>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #d9dbeb",
              marginTop: 6,
            }}
          />
        </label>
        <label style={{ fontWeight: 500, fontSize: 16 }}>
          Phone
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Phone number"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #d9dbeb",
              marginTop: 6,
            }}
          />
        </label>
        <label style={{ fontWeight: 500, fontSize: 16 }}>
          Address
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            placeholder="Address"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #d9dbeb",
              marginTop: 6,
            }}
          />
        </label>
        <label style={{ fontWeight: 500, fontSize: 16 }}>
          Profile Photo URL
          <input
            name="profilePic"
            type="url"
            value={form.profilePic}
            onChange={handleChange}
            placeholder="Paste image URL (optional)"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #d9dbeb",
              marginTop: 6,
            }}
          />
        </label>
        {error && (
          <div style={{ color: "#e84d4f", fontWeight: 600 }}>{error}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 8,
            width: "100%",
            background: "#5271ff",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "13px 0",
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: ".7px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Saving..." : "Add Investor"}
        </button>
      </form>
    </div>
  );
}
