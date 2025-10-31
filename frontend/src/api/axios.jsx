import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api/v1" // local backend URL
      : "https://student-management-system-5yu7.onrender.com/api/v1", // Render backend URL
  withCredentials: true, // cookies ke liye zaruri
});

export default api;
