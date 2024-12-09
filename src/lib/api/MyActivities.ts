// 내 체험 삭제
import axios from "axios";
import { proxy } from "./axiosInstanceApi";

export const deleteMyReservation = async (activityId: number) => {
  try {
    const response = await proxy.delete(`/api/my/${activityId}`);
    return response.data;
  } catch (error) {
    console.error("내 체험 삭제 오류: ", error);
  }
};

export const deleteMyActivities = async (activityId: number) => {
  try {
    const { data } = await proxy.delete(`/api/my-activities/${activityId}`);
    return data.activities;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "체험 삭제에 실패했습니다");
    }
    throw error;
  }
};

export const getMyActivities = async () => {
  try {
    const { data } = await proxy.get("/api/my-activities", {
      params: { size: 20 },
    });
    return data.activities;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "체험 불러오기에 실패했습니다");
    }
    throw error;
  }
};
