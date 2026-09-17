import axios from "axios";

// Create a configured axios instance pointing to your TypeScript backend
// Inside mockApi.jsx
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:3000",
  timeout: 90000,
  headers: {
    "Content-Type": "application/json",
  }
});

export const fetchComparison = async (prompt) => {
  // Make the actual POST request matching the backend expectations
  const response = await api.post("/invoke", { prompt });

  // Return the wrapper object so App.jsx reads response.data
  return response.data;
};