import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", name);
        navigate("/homepage", { replace: true });
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F3F6FC",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          padding: 32,
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 16px #7286D340",
          width: 350,
        }}
      >
        <h2>Create Account</h2>
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: 9,
              borderRadius: 4,
              border: "1px solid #cfd6e0",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: 9,
              borderRadius: 4,
              border: "1px solid #cfd6e0",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 9,
              borderRadius: 4,
              border: "1px solid #cfd6e0",
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            fontWeight: 700,
            fontSize: 16,
            borderRadius: 5,
            background: "#5D5FEF",
            color: "#fff",
            border: "none",
          }}
        >
          Sign Up
        </button>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <span>Already have an account? </span>
          <Link to="/login" style={{ color: "#5D5FEF", fontWeight: 600 }}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
