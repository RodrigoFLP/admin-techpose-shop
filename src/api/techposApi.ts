import axios from "axios";

const techposApi = axios.create({
  baseURL: "http://192.168.0.10:5000",
  withCredentials: true,
});

export default techposApi;
