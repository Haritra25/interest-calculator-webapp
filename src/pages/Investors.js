import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Investors() {
  const [investors, setInvestors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInvestors() {
      try {
        const response = await api.get("/investors");
        setInvestors(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch investors");
      }
      setLoading(false);
    }
    fetchInvestors();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2>Investors</h2>
      <button onClick={() => navigate("/add-investor")}>+ Add Investor</button>
      <ul>
        {investors.map((inv) => (
          <li key={inv._id}>
            {inv.name} ({inv.phone})
          </li>
        ))}
      </ul>
    </div>
  );
}
