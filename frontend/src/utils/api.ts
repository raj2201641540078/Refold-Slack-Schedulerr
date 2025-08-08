import axios from "axios";

// Access the env variable
const baseURL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL, // same as baseURL: baseURL
  withCredentials: true,
});

export default api;