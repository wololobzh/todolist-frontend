import axios from "axios";

const isLocal = window.location.hostname === "localhost";

export const api = axios.create({
  baseURL: isLocal
    ? "http://localhost:4000/api/todos"  // 💻 Mode dev local
    : "/api/todos"                      // 🚀 Mode production (via Nginx)
});