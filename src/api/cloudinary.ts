import axios from "axios";

const cloudinary = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1/dj40hxx32/image/upload",
});

export default cloudinary;
