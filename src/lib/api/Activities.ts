// 체험 상세 조회
import axiosInstance, { proxy } from "./axiosInstanceApi";

export const getActivityDetail = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/activities/${id}`);
    return response.data;
  } catch (error) {
    console.error("체험 상세 조회 오류: ", error);
  }
};

// 체험 예약 신청
export const postReservation = async ({
  activityId,
  scheduleId,
  headCount,
}: {
  activityId: number;
  scheduleId: number;
  headCount: number;
}) => {
  try {
    const response = await proxy.post(`/api/activities/reservations`, { activityId, scheduleId, headCount });
    return response.data;
  } catch (error) {
    console.error("체험 예약 신청 오류: ", error);
  }
};

// 체험 리뷰 조회
export const getReviews = async ({
  activityId,
  page = 1,
  size = 3,
}: {
  activityId: number;
  page?: number;
  size?: number;
}) => {
  try {
    const response = await axiosInstance.get(`/activities/${activityId}/reviews?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error("체험 리뷰 조회 오류: ", error);
  }
};

// 체험 리스트 조회
export const getActivities = async ({
  method = "cursor",
  cursorId,
  category,
  keyword,
  sort = "latest",
  page,
  size,
}: {
  method?: string;
  cursorId?: number;
  category?: string;
  keyword?: string;
  sort?: string;
  page?: number;
  size?: number;
}) => {
  try {
    const response = await axiosInstance.get("/activities", {
      params: {
        ...(method && { method }),
        ...(cursorId && { cursorId }),
        ...(category && { category }),
        ...(keyword && { keyword }),
        ...(sort && { sort }),
        ...(page && { page }),
        ...(size && { size }),
      },
    });

    return response.data;
  } catch (error) {
    console.error("체험 리스트 조회 오류: ", error);
  }
};
