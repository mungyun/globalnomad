// Activity 타입 정의
export interface Activity {
  id: number; // 활동 ID
  title: string; // 활동 제목
  bannerImageUrl: string; // 배너 이미지 URL
}

// Reservation 타입 정의
export interface Reservation {
  id: number; // 예약 ID
  teamId: string; // 팀 ID
  userId: number; // 사용자 ID
  activity: Activity; // 활동 정보
  scheduleId: number; // 일정 ID
  status: ReservationStatus; // 예약 상태
  reviewSubmitted: boolean; // 리뷰 제출 여부
  totalPrice: number; // 총 금액
  headCount: number; // 참가 인원 수
  date: string; // 예약 날짜
  startTime: string; // 시작 시간
  endTime: string; // 종료 시간
  createdAt: string; // 생성 날짜
  updatedAt: string; // 업데이트 날짜
}

// ReservationResponse 타입 정의
export interface ReservationResponse {
  cursorId: number; // 페이징 커서 ID
  reservations: Reservation[]; // 예약 배열
  totalCount: number; // 총 예약 수
}

// ReservationStatus 타입 정의
export type ReservationStatus = "pending" | "confirmed" | "declined" | "canceled" | "completed";

// ReservationStatusType 정의
export interface ReservationStatusType {
  color: string; // 상태에 따른 색상
  text: string; // 상태 텍스트
  buttonColor?: string; // 버튼 색상 (선택적)
  buttonText?: string; // 버튼 텍스트 (선택적)
  showButton: boolean; // 버튼 표시 여부
}

// 예약 상태 통계 타입 정의
export interface ReservationData {
  date: string; // 날짜
  reservations: {
    completed: number; // 완료된 예약 수
    confirmed: number; // 확인된 예약 수
    pending: number; // 대기 중 예약 수
  };
}
