import React, { useEffect, useState } from "react";
import TopNavBar from "../components/TopNavBar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const TAB_LIST = ["Investors", "My Accounts"];

export default function Accounts() {
  const [tab, setTab] = useState(0);
  const [investors, setInvestors] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        if (tab === 0) {
          const res = await fetch(
            "http://localhost:5000/api/accounts/investors",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const data = await res.json();
          setInvestors(Array.isArray(data.investors) ? data.investors : []);
        } else if (tab === 1) {
          const res = await fetch(
            "http://localhost:5000/api/accounts/myaccounts",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const data = await res.json();
          setAccounts(Array.isArray(data.accounts) ? data.accounts : []);
        }
        setError(null);
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [tab, token]);

  const renderCard = (person, isInvestor = false) => (
    <div
      key={person._id}
      style={{
        display: "flex",
        alignItems: "center",
        background: "#f7f8fc",
        borderRadius: 16,
        padding: "12px 14px",
        marginBottom: 16,
        boxShadow: "0 1px 10px #e5e9f5a0",
        justifyContent: "space-between",
        minHeight: 64,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={
            person.profilePic || "https://randomuser.me/api/portraits/men/1.jpg"
          }
          alt={person.name}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: 16,
          }}
        />
        <div>
          <div style={{ fontWeight: 600, fontSize: 16, color: "#232743" }}>
            {person.name}
          </div>
          <div style={{ fontWeight: 400, fontSize: 13, color: "#8990ae" }}>
            {isInvestor ? person.address : person.type}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "right", minWidth: 120, flexShrink: 0 }}>
        <div style={{ fontWeight: 500, fontSize: 13, color: "#232a45" }}>
          {person.phone ? `+91 ${person.phone}` : ""}
        </div>
        <span
          style={{
            color: "#5271ff",
            background: "#ecf0fe",
            borderRadius: 7,
            padding: "3px 13px",
            fontWeight: 500,
            fontSize: 13,
            marginTop: 3,
            display: "inline-block",
          }}
        >
          More
        </span>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#eaedfb", minHeight: "100vh" }}>
      <Header />
      <TopNavBar />
      <div
        style={{
          maxWidth: 540,
          margin: "28px auto",
          borderRadius: 24,
          background: "#f3f6fc",
          boxShadow: "0 2px 14px #e5e9f5",
          padding: "18px 22px 32px 22px",
        }}
      >
        <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
          {TAB_LIST.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              style={{
                flex: 1,
                background: tab === i ? "#5271ff" : "#f7f8fc",
                color: tab === i ? "#fff" : "#5271ff",
                fontWeight: 600,
                border: "none",
                fontSize: 15,
                borderRadius: "14px 14px 0 0",
                padding: "11px 0",
                cursor: "pointer",
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div
          style={{
            fontWeight: 600,
            marginBottom: 20,
            color: "#232743",
            fontSize: 16,
          }}
        >
          Accounts
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : tab === 0 ? (
          investors.length ? (
            investors.map((person) => renderCard(person, true))
          ) : (
            <p>No investors found.</p>
          )
        ) : accounts.length ? (
          accounts.map((person) => renderCard(person, false))
        ) : (
          <p>No accounts found.</p>
        )}
        {tab === 0 && (
          <button
            style={{
              width: "100%",
              marginTop: 8,
              padding: "13px 0",
              background: "#5271ff",
              color: "#fff",
              border: "none",
              borderRadius: 14,
              fontWeight: 600,
              fontSize: 15,
              boxShadow: "0 2px 8px #5271ff30",
              cursor: "pointer",
            }}
            onClick={() => navigate("/add-investor")}
          >
            + New Investor
          </button>
        )}
      </div>
    </div>
  );
}
