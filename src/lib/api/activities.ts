import { isAxiosError } from "axios";
import { proxy } from "./axiosInstanceApi";

// 체험 이미지 url 생성
export const PostActivitiesImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const res = await proxy.post("/api/activities/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "서버 오류가 발생했습니다.";
      throw new Error(`${message} (${status})`);
    }

    // Axios 외의 예외 처리
    throw new Error("알 수 없는 오류가 발생했습니다. 나중에 다시 시도해주세요.");
  }
};
