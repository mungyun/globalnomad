// Activity 타입 정의
export interface Activity {
  bannerImageUrl: string; // 배너 이미지 URL
  title: string; // 활동 제목
  id: number; // 활동 ID
}

// Reservation 타입 정의
export interface Reservation {
  id: number; // 예약 ID
  teamId: string; // 팀 ID
  userId: number; // 사용자 ID
  activity: Activity; // 활동 정보
  scheduleId: number; // 일정 ID
  status: string; // 예약 상태
  reviewSubmitted: boolean; // 리뷰 제출 여부
  totalPrice: number; // 총 금액
  headCount: number; // 참가 인원 수
  date: string; // 예약 날짜
  startTime: string; // 시작 시간
  endTime: string; // 종료 시간
  createdAt: string; // 생성 날짜
  updatedAt: string; // 업데이트 날짜
}

// MyReservations 타입 정의
export interface MyReservations {
  cursorId: number; // 페이징 커서 ID
  reservations: Reservation[]; // 예약 배열
  totalCount: number; // 총 예약 수
}

// 리뷰 데이터를 정의하는 타입
export interface Review {
  id: number;
  user: User;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 전체 리뷰 응답 데이터를 정의하는 타입
export interface ReviewResponse {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
}

export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface User {
  id: number; // 사용자 ID
  email?: string; // 사용자 이메일 주소
  nickname: string; // 사용자 닉네임
  profileImageUrl: string | null; // 사용자 프로필 이미지 Url
  createdAt?: string; // 사용자 회원가입 날짜
  updatedAt?: string; // 사용자 정보 수정 날짜
}

export interface ReservationList {
  id: number;
  activity: {
    bannerImageUrl: string;
    title: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  totalPrice: number;
  status: string;
}
