// 공통 Schedule 타입
export interface Schedule {
  id?: number; // 수정 시 사용
  date: string;
  startTime: string;
  endTime: string;
}

interface ActivityBase {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  schedules: Schedule[];
}

// 체험 등록 body 타입
export interface PostActivityType extends ActivityBase {
  subImageUrls?: string[];
}

// 체험 수정 body 타입
export interface PatchActivityType extends ActivityBase {
  subImages?: SubImage[];
  subImageIdsToRemove?: number[]; // 삭제할 서브 이미지 ID 목록
  subImageUrlsToAdd?: string[]; // 추가할 서브 이미지 URL 목록
  scheduleIdsToRemove?: number[]; // 삭제할 스케줄 ID 목록
  schedulesToAdd?: Schedule[]; // 추가할 스케줄 목록
}

// 공통 ActivityForm 타입
export type ActivityForm = PostActivityType | PatchActivityType;

export interface SubImage {
  id: number;
  imageUrl: string;
}

// 체험 상세 타입

export interface ActivityDetail {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: SubImage[];
  schedules: Schedule[];
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityItem {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: "문화 · 예술" | "스포츠" | "식음료" | "투어" | "관광" | "웰빙";
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface User {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

interface Review {
  id: number;
  user: User;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string; // ISO 형식의 날짜
  updatedAt: string; // ISO 형식의 날짜
}

export interface ReviewData {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
}

export type GetActivities = {
  cursorId: number;
  totalCount: number;
  activities: ActivityItem[];
};
