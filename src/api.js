import axios from "axios";

export function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust per your backend URL
});
