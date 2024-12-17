import { ReservationResponse } from "@/types/MyReservationType";
import { isAxiosError } from "axios";
import { proxy } from "./axiosInstanceApi";

// 내 예약 정보 요청
export const getMyReservation = async () => {
  try {
    const { data } = await proxy.get<ReservationResponse>("/api/my-reservations", {
      params: { size: 10 },
    });
    return data.reservations;
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
