export interface ReservationResponse {
  cursorId: number;
  reservations: Reservation[];
  totalCount: number;
}

export interface Reservation {
  id: number;
  teamId: string;
  userId: number;
  activity: Activity;
  scheduleId: number;
  status: "pending" | "confirmed" | "declined" | "canceled" | "completed";
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: number;
  title: string;
  bannerImageUrl: string;
}

export type ReservationStatus = "pending" | "confirmed" | "declined" | "canceled" | "completed";

export interface ReservationStatusType {
  color: string;
  text: string;
  buttonColor?: string;
  buttonText?: string;
  showButton: boolean;
}
