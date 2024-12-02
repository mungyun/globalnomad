// 스케줄 타입
export interface Schedule {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
}

// 체험 등록 body 타입
export interface PostActivities {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl?: string;
  bannerImageFile?: File;
  schedules: Schedule[];
  subImageUrls?: File[];
  subImageFiles?: File[];
}

export interface PatchActivites {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl?: string;
  bannerImageFile?: File;

  subImageFiles?: File[];
  subImageIdsToRemove?: number[];
  subImageUrlsToAdd?: string[];

  schedules: Schedule[];
  scheduleIdsToRemove?: number[];
  schedulesToAdd?: string[];
}

export type ActiviteForm = PostActivities | PatchActivites;

interface SubImage {
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
