import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaMoneyCheckAlt,
  FaChartLine,
  FaUser,
  FaBook,
} from "react-icons/fa";

export default function TopNavBar() {
  const navItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: 7,
    fontSize: 17,
    padding: "8px 20px",
    borderRadius: 22,
    fontWeight: 600,
    textDecoration: "none",
  };
  return (
    <nav
      style={{
        background: "#7C9AE3",
        borderRadius: 32,
        padding: 8,
        margin: "28px auto 32px auto",
        width: 540,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 18px #7286D355",
      }}
    >
      <NavLink
        to="/"
        style={({ isActive }) => ({
          ...navItemStyle,
          background: isActive ? "#294286" : "transparent",
          color: "#fff",
        })}
      >
        <FaHome size={21} /> Home
      </NavLink>

      <NavLink
        to="/portfolio"
        style={({ isActive }) => ({
          ...navItemStyle,
          background: isActive ? "#294286" : "transparent",
          color: "#fff",
        })}
      >
        <FaChartLine size={21} />
      </NavLink>
      <NavLink
        to="/payments"
        style={({ isActive }) => ({
          ...navItemStyle,
          background: isActive ? "#294286" : "transparent",
          color: "#fff",
        })}
      >
        <FaBook size={21} />
      </NavLink>

      <NavLink
        to="/accounts"
        style={({ isActive }) => ({
          ...navItemStyle,
          background: isActive ? "#294286" : "transparent",
          color: "#fff",
        })}
      >
        <FaMoneyCheckAlt size={21} />
      </NavLink>

      <NavLink
        to="/profile"
        style={({ isActive }) => ({
          ...navItemStyle,
          background: isActive ? "#294286" : "transparent",
          color: "#fff",
        })}
      >
        <FaUser size={21} />
      </NavLink>
    </nav>
  );
}
