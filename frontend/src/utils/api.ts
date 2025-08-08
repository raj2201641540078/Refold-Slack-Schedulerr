// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api/slack", // ✅ Adjust if needed
//   withCredentials: true,
// });

// export default api;

// File: src/utils/api.ts

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/slack",
  withCredentials: true,
});

export default api;
