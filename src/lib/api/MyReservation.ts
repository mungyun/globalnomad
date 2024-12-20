import { ReservationResponse } from "@/types/MyReservationType";
import { isAxiosError } from "axios";
import { proxy } from "./axiosInstanceApi";

// 내 예약 정보 요청
export const getMyReservation = async ({ pageParam, filter }: { pageParam: number | unknown; filter: string }) => {
  try {
    let url = "/api/my-reservations?size=10";
    if (pageParam) url += `&cursorId=${pageParam}`;
    if (filter) url += `&status=${filter}`;
    const { data } = await proxy.get<ReservationResponse>(url);
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

// 내 예약 취소 요청
export const cancelMyReservation = async (reservationId: number) => {
  try {
    const response = await proxy.patch("/api/my/reservation", {
      reservationId,
      status: "canceled",
    });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

// 내 예약 리뷰 작성
export const postReview = async ({
  reservationId,
  rating,
  content,
}: {
  reservationId: number;
  rating: number;
  content: string;
}) => {
  try {
    const response = await proxy.post(`/api/my-reservations/${reservationId}`, {
      reservationId,
      rating,
      content,
    });
    return response.data;
  } catch (error) {
    // Axios 에러 처리
    if (isAxiosError(error)) {
      // 서버에서 반환된 에러 메시지 사용
      throw error;
    }

    // Axios 외의 예외 처리
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};
