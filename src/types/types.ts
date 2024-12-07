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

// 예약내역 데이터를 정의하는 타입
export type ReservationStatus = "pending" | "cancelled" | "confirmed" | "refused" | "completed";

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
  status: ReservationStatus;
}

// 체험관리 데이터를 정의하는 타입
export interface ActivityList {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}
