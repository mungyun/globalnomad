import { Reservation, ReservationResponse } from "@/types/MyReservationType";
import axios, { AxiosError } from "axios";
import { proxy } from "./axiosInstanceApi";

export const getMyReservation = async (): Promise<Reservation[]> => {
  try {
    const { data } = await proxy.get<ReservationResponse>("api/my-reservations", {
      params: { size: 10 },
    });
    return data.reservations;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "예약 정보를 가져오는데 실패했습니다.");
    }
    throw error;
  }
};

export const cancelMyReservation = async (reservationId: number): Promise<void> => {
  try {
    const { data } = await proxy.patch(`api/my-reservations/${reservationId}`, { status: "canceled" });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "예약 삭제에 실패했습니다.");
    }
    throw error;
  }
};
