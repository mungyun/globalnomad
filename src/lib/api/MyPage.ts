import { UpdateUser } from "@/types/MyPageType";
import { isAxiosError } from "axios";
import { proxy } from "./axiosInstanceApi";

// 내 정보 조회
export const getUsersProfile = async () => {
  try {
    const response = await proxy.get("/api/my");
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

// 내 정보 수정
export const updateUserProfile = async (data: UpdateUser) => {
  try {
    const response = await proxy.patch("/api/my", {
      nickname: data.nickname,
      profileImageUrl: data.profileImageUrl,
      newPassword: data.newPassword,
    });

    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

// 프로필 이미지 url 생성
export const PostProfileImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await proxy.post("/api/my", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};
