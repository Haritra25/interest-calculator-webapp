import React, { useState } from "react";

export default function CalculatorPopup({ open, onClose }) {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("");

  if (!open) return null;

  const calculate = () => {
    try {
      // Cautiously use eval, or use a math parser library for security in production
      // eslint-disable-next-line
      const val = eval(expr);
      setResult(val);
    } catch {
      setResult("Error");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.15)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          padding: 24,
          boxShadow: "0 4px 22px #bcbcbc55",
          minWidth: 260,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <h3 style={{ margin: 0 }}>Calculator</h3>
          <button
            onClick={onClose}
            style={{
              fontSize: 18,
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            &#x2715;
          </button>
        </div>
        <input
          type="text"
          value={expr}
          autoFocus
          onChange={(e) => setExpr(e.target.value)}
          placeholder="e.g. 12+45/3"
          style={{
            width: "100%",
            fontSize: 18,
            padding: 8,
            borderRadius: 8,
            border: "1px solid #cfcfcf",
            marginBottom: 10,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") calculate();
          }}
        />
        <button
          style={{
            background: "#5D5FEF",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "7px 22px",
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={calculate}
        >
          Calculate
        </button>
        {result !== "" && (
          <div style={{ marginTop: 15, fontSize: 18, color: "#2740c5" }}>
            Result: {result}
          </div>
        )}
      </div>
    </div>
  );
}
