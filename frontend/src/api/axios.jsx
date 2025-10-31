import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",   // proxy ke liye short path
  withCredentials: true, // cookies ke liye important
});

export default api;
