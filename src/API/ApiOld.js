import axios from "axios";
import { Cookies } from "react-cookie";

// Old Swagger
const apiUrl = "https://cashif-001-site1.dtempurl.com/";

const API = axios.create({
  baseURL: apiUrl,
});

const cookies = new Cookies();
API.interceptors.request.use(
  (config) => {
    const token = cookies.get("tokenApp");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
