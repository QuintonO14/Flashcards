import axios from "axios";

const api = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": localStorage.getItem("token")
  },
});

export default api;
