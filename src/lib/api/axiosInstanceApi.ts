import axios from "axios";

const TEMP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMyNCwidGVhbUlkIjoiOS0xIiwiaWF0IjoxNzMzMjM2NjM1LCJleHAiOjE3MzMyMzg0MzUsImlzcyI6InNwLWdsb2JhbG5vbWFkIn0.U9i1AFV20FICeYYbbbS5DKNZr7kQvRzoZP-ek-NVkSo";

export const proxy = axios.create({
  baseURL: "https://sp-globalnomad-api.vercel.app/9-1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TEMP_TOKEN}`,
  },
});

// 요청 인터셉터 추가
proxy.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default proxy;
