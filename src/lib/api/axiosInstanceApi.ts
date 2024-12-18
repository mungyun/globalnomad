import axios from "axios";

// 인스턴스
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 프록시
export const proxy = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
