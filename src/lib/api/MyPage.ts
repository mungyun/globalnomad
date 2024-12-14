import { UpdateUser } from "@/types/MyPageType";
import { isAxiosError } from "axios";
import { proxy } from "./axiosInstanceApi";

export const getUsersProfile = async () => {
  try {
    const response = await proxy.get("/api/my");
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || "서버 오류가 발생했습니다.";
      throw new Error(message);
    }

    // Axios 외의 예외 처리
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

export const updateUserProfile = async (data: UpdateUser) => {
  try {
    const response = await proxy.patch("/api/my", {
      nickname: data.nickname,
      // profileImageUrl: data.profileImageUrl,
      newPassword: data.newPassword,
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || "서버 오류가 발생했습니다.";
      throw new Error(message);
    }

    // Axios 외의 예외 처리
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

export const PostProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await proxy.post("/api/my", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
