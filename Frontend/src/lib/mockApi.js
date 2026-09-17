import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:3000",
  timeout: 90000,
  headers: {
    "Content-Type": "application/json",
  }
});

export const fetchComparison = async (prompt) => {
  const response = await api.post("/invoke", { prompt });
  return response.data;
};