import axios from "axios";

const API_BASE_URL : string = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export default axiosInstance;