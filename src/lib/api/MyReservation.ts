import { isAxiosError } from "axios";
import { proxy } from "./axiosInstanceApi";

// 내 예약 정보 요청
export const getMyReservation = async () => {
  try {
    const response = await proxy.get("api/my/reservation");
    return response.data.reservations;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || "서버 오류가 발생했습니다.";
      throw new Error(message);
    }

    // Axios 외의 예외 처리
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

// 내 예약 취소 요청
export const cancelMyReservation = async (reservationId: number) => {
  try {
    const response = await proxy.patch("api/my/reservation", {
      reservationId,
      status: "canceled",
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
