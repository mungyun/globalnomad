import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (res) => res, // 성공적인 응답은 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 에러가 발생하고, 아직 리프레시 토큰을 시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 토큰 갱신 요청
        const response = await axiosInstance.post("/auth/token/refresh", undefined);

        // 새로 갱신된 액세스 토큰을 쿠키에 저장
        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        // 쿠키에 토큰을 저장하는 방법
        document.cookie = `accessToken=${newAccessToken}; path=/; Secure; HttpOnly`;
        document.cookie = `accessToken=${newRefreshToken}; path=/; Secure; HttpOnly`;

        // 새 토큰을 Authorization 헤더에 설정
        axiosInstance.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // 원래 요청을 새 토큰으로 재시도
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 처리
        console.error("토큰 갱신 실패:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    // 401 외 다른 에러는 그대로 반환
    return Promise.reject(error);
  }
);

export default axiosInstance;
