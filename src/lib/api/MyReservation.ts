import { TestAuth } from "@/app/(app)/my/activity/components/qwe";
import { Reservation, ReservationResponse } from "@/types/MyReservationType";
import axios, { AxiosError } from "axios";

const BASE_URL = "https://sp-globalnomad-api.vercel.app/9-1";

export const getMyReservation = async (): Promise<Reservation[]> => {
  try {
    const { data } = await axios.get<ReservationResponse>(`${BASE_URL}/my-reservations`, {
      params: { size: 10 },
      headers: { Authorization: `Bearer ${TestAuth}` },
    });
    return data.reservations;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "예약 정보를 가져오는데 실패했습니다.");
    }
    throw error;
  }
};

export const cancelMyReservation = async (reservationId: number): Promise<void> => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/my-reservations/${reservationId}`,
      { status: "canceled" },
      { headers: { Authorization: `Bearer ${TestAuth}` } }
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "예약 삭제에 실패했습니다.");
    }
    throw error;
  }
};
