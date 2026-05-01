import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data.user || null);
      } catch (e) {
        setUser(null);
      }
    }
    if (token) fetchProfile();
  }, [token]);

  // SVG icons
  const arrowLeft = (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 19L8 12L15 5"
        stroke="#232743"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const searchIcon = (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" stroke="#8990ae" strokeWidth="2" />
      <path
        d="M21 21L17 17"
        stroke="#8990ae"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
  const bellIcon = (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 3a7 7 0 0 0-7 7v4a1 1 0 0 1-.293.707l-1 1A1 1 0 0 0 5 18h14a1 1 0 0 0 .707-1.707l-1-1A1 1 0 0 1 19 14v-4a7 7 0 0 0-7-7Z"
        stroke="#8990ae"
        strokeWidth="2"
      />
      <path d="M9 21a3 3 0 0 0 6 0" stroke="#8990ae" strokeWidth="2" />
    </svg>
  );

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  // Action list config for maintainable rendering
  const sections = [
    {
      items: [
        {
          label: "Change Language",
          icon: "🌐",
          onClick: () => alert("Change Language"),
        },
        { label: "Theme", icon: "🌓", onClick: () => alert("Theme") },
      ],
    },
    {
      items: [
        { label: "Settings", icon: "⚙️", onClick: () => navigate("/settings") },
        { label: "Fields", icon: "🗂", onClick: () => alert("Fields") },
      ],
    },
    {
      items: [
        { label: "Storage", icon: "🗄", onClick: () => alert("Storage") },
        { label: "Export", icon: "📤", onClick: () => alert("Export") },
      ],
    },
    {
      items: [{ label: "Log Out", type: "danger", icon: "⎋", onClick: logout }],
    },
    {
      items: [
        {
          label: "Support Portal",
          icon: "💬",
          onClick: () => window.open("/support", "_blank"),
        },
        {
          label: "User Manual",
          icon: "📑",
          onClick: () => window.open("/manual", "_blank"),
        },
        {
          label: "Contact",
          icon: "☎️",
          onClick: () => window.open("/contact", "_blank"),
        },
      ],
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#e2e5f3",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 22,
        fontFamily: "Inter",
        boxSizing: "border-box",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          width: "100%",
          maxWidth: 370,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
          padding: "0 10px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {arrowLeft}
        </button>
        <span style={{ fontWeight: 600, fontSize: 18 }}>Profile</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>{searchIcon}</span>
          <span>{bellIcon}</span>
        </div>
      </div>
      {/* Profile Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          maxWidth: 330,
          width: "100%",
          margin: "10px auto 23px auto",
          padding: "18px 0 18px 16px",
          display: "flex",
          alignItems: "center",
          boxShadow: "0 1px 10px #e5e9f570",
          gap: 18,
        }}
      >
        <img
          src={
            user?.profilePic || "https://randomuser.me/api/portraits/men/1.jpg"
          }
          alt={user?.name || "User"}
          style={{
            width: 45,
            height: 45,
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: 18,
          }}
        />
        <div>
          <div style={{ fontWeight: 600, fontSize: 16, color: "#232743" }}>
            {user?.name || "Monica Bhalla"}
          </div>
          <div style={{ color: "#a3aabd", fontSize: 13 }}>
            {user?.type || "Customer Account"}
          </div>
        </div>
      </div>
      {/* Section Groups */}
      <div style={{ maxWidth: 330, width: "100%" }}>
        {sections.map((section, idx) => (
          <div
            key={idx}
            style={{
              background: "#f6f7fb",
              borderRadius: 13,
              marginBottom: 13,
              padding: section.items.length === 1 ? "10px 0" : "3px 0",
              boxShadow: "0 1px 8px #e5e9f530",
            }}
          >
            {section.items.map((item, j) => (
              <button
                key={item.label}
                onClick={item.onClick}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: item.type === "danger" ? "15px 19px" : "13px 19px",
                  color: item.type === "danger" ? "#e84d4f" : "#232743",
                  fontWeight: item.type === "danger" ? 700 : 500,
                  fontSize: 15,
                  borderBottom:
                    j < section.items.length - 1 ? "1px solid #e3e7f7" : "none",
                  border: "none",
                  background: "none",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <span style={{ marginRight: 11, fontSize: 18 }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                <span style={{ color: "#8990ae", fontSize: 17 }}>&#8250;</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
