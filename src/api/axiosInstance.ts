import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lumituneapp.azurewebsites.net/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;