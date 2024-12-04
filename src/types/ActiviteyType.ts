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

export type GetActivities = {
  cursorId: number;
  totalCount: number;
  activities: ActivityItem[];
};
