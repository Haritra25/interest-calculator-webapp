import React, { useEffect, useState } from "react";

export default function ProfileCard() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: "", profilePic: "" });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data.user || null);
        setForm({
          name: data.user?.name || "",
          profilePic: data.user?.profilePic || "",
        });
      } catch {
        setUser(null);
      }
    }
    if (token) fetchProfile();
  }, [token, edit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage("Profile updated successfully.");
        setEdit(false);
      } else {
        setMessage("Failed to save.");
      }
    } catch {
      setMessage("Failed to save.");
    }
  };

  return (
    <div
      style={{
        background: "#f4f5fb",
        borderRadius: 26,
        padding: "18px 0 18px 18px",
        minHeight: 83,
        boxShadow: "0 1px 7px #e5e9f520",
        maxWidth: 390,
        width: "100%",
        display: "flex",
        alignItems: "center",
        margin: "22px auto 30px auto",
      }}
    >
      <img
        src={form.profilePic || "https://randomuser.me/api/portraits/men/1.jpg"}
        alt={form.name || "Profile photo"}
        style={{
          width: 57,
          height: 57,
          borderRadius: "50%",
          objectFit: "cover",
          marginRight: 24,
          background: "#dbe3ee",
        }}
      />
      <div style={{ flex: 1 }}>
        {edit ? (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 5 }}
          >
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              style={{
                fontWeight: 700,
                fontSize: 21,
                color: "#232743",
                marginBottom: 2,
                padding: "4px 10px",
                borderRadius: 7,
                border: "1px solid #ccc",
                marginBottom: 7,
              }}
              placeholder="Your Name"
              required
            />
            <input
              name="profilePic"
              value={form.profilePic}
              onChange={handleChange}
              style={{
                fontSize: 15,
                padding: "5px 10px",
                borderRadius: 7,
                border: "1px solid #dedede",
              }}
              placeholder="Paste Image URL"
              type="url"
            />
            <div style={{ display: "flex", gap: 5, marginTop: 7 }}>
              <button
                type="submit"
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  padding: "5px 13px",
                  borderRadius: 7,
                  background: "#545ef7",
                  color: "#fff",
                  border: "none",
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEdit(false)}
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  padding: "5px 13px",
                  borderRadius: 7,
                  background: "#e84d4f",
                  color: "#fff",
                  border: "none",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div
              style={{
                fontWeight: 700,
                fontSize: 25,
                color: "#232743",
                marginBottom: 2,
              }}
            >
              {user?.name || "Monica Bhalla"}
            </div>
            <div style={{ color: "#a3aabd", fontSize: 18, fontWeight: 500 }}>
              {user?.type || "Customer Account"}
            </div>
            <button
              onClick={() => setEdit(true)}
              style={{
                marginTop: 6,
                fontSize: 14,
                fontWeight: 600,
                padding: "4px 15px",
                background: "#5271ff",
                color: "#fff",
                border: "none",
                borderRadius: 7,
                cursor: "pointer",
              }}
            >
              Edit
            </button>
          </>
        )}
        {message && (
          <div
            style={{
              color: "#4A9A55",
              fontWeight: 600,
              fontSize: 15,
              marginTop: 8,
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
