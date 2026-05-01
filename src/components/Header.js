import React, { useRef, useState, useEffect } from "react";
import CalculatorPopup from "./CalculatorPopup";
import NotificationsPopup from "./NotificationsPopup";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { FaCalculator } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function Header() {
  const storedUsername = localStorage.getItem("username") || "User";
  const [name, setName] = useState(storedUsername);
  const [editing, setEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [calcOpen, setCalcOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const profileImgSrc = profilePic
    ? URL.createObjectURL(profilePic)
    : "https://randomuser.me/api/portraits/women/44.jpg";

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    if (notifOpen) {
      const fetchNotifications = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await api.get("/notifications/today", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setNotifications(res.data.notifications);
        } catch {
          setNotifications(["Failed to fetch notifications"]);
        }
      };
      fetchNotifications();
    }
  }, [notifOpen]);

  const handleNameSave = async () => {
    setEditing(false);
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        "/user/profile",
        { displayName: name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.setItem("username", name);
    } catch (err) {
      alert("Failed to update name.");
    }
  };

  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      try {
        const uploadRes = await api.post("/upload/screenshot", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        const url = uploadRes.data.url;
        await api.patch(
          "/user/profile",
          { profilePicture: url },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch {
        alert("Image upload failed.");
      }
    }
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#8594e9ff",
        borderRadius: "0 0 24px 24px",
        padding: "20px 30px",
        boxShadow: "0 2px 8px #eee",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <div style={{ position: "relative", width: 42, height: 42 }}>
          <img
            src={profileImgSrc}
            alt="Profile"
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => fileInputRef.current.click()}
            title="Click to change photo"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
        <div>
          {editing ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleNameSave}
              style={{
                fontWeight: 700,
                fontSize: 17,
                border: "1px solid #eee",
                borderRadius: 4,
                padding: "2px 8px",
              }}
              autoFocus
            />
          ) : (
            <div style={{ fontWeight: 700, fontSize: 17 }}>
              Hello{" "}
              <span
                onClick={() => setEditing(true)}
                style={{ color: "#191ddaff", cursor: "pointer" }}
              >
                {name}!
              </span>
            </div>
          )}
          <div style={{ fontSize: 12, color: "#9b9b9b" }}>Welcome back</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "22px", alignItems: "center" }}>
        <button
          onClick={() => navigate("/interest-calculator")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
          title="Interest Calculator"
        >
          <FaCalculator size={25} color="#1a1a1a" />
        </button>
        <button
          onClick={() => setNotifOpen((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
          title="Notifications"
        >
          <IoMdNotificationsOutline size={29} color="#1a1a1a" />
        </button>
        <CalculatorPopup open={calcOpen} onClose={() => setCalcOpen(false)} />
        <NotificationsPopup
          open={notifOpen}
          onClose={() => setNotifOpen(false)}
          notifications={notifications}
        />
        {/* Logout button near notification icon */}
        <button
          onClick={handleLogout}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginLeft: "12px",
            fontWeight: 600,
            color: "#5D5FEF",
            fontSize: "16px",
          }}
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
