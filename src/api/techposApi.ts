import axios from "axios";

const techposApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default techposApi;
