import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://lumituneapp.azurewebsites.net/", // додай /api якщо в тебе API лежить під цим шляхом
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;