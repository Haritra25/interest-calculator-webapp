import { useNavigate } from "react-router-dom";

export default function BackHomeButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      style={{
        background: "transparent",
        border: "none",
        color: "#294286",
        fontSize: 26,
        margin: "18px 0 0 24px",
        cursor: "pointer",
      }}
      aria-label="Back to Home"
      title="Back to Home"
    >
      {/* Simple Arrow Left icon (SVG) */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M15 18l-6-6 6-6"
          stroke="#294286"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
