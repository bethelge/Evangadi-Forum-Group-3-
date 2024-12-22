import axios from "axios";

const axiosBase = axios.create({
  // baseURL:'http://localhost:5200/api'
  baseURL: import.meta.env.VITE_API_URL,
});
export default axiosBase;
