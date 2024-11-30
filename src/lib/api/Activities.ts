// 체험 상세 조회
import axiosInstance from "./axiosInstanceApi";

export const getActivityDetail = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/activities/${id}`);
    return response.data;
  } catch (error) {
    console.error("체험 상세 조회 오류: ", error);
  }
};
