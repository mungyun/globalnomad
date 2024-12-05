// 스케줄 타입
export interface Schedule {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
}

// 체험 등록 body 타입
export interface PostActivityType {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageUrls?: string[];
  schedules: Schedule[];
}

export interface PatchActivityType {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove?: number[];
  subImageUrlsToAdd?: string[];
  schedules: Schedule[];
  scheduleIdsToRemove?: number[];
  schedulesToAdd?: string[];
}

export type ActiviteForm = PostActivityType | PatchActivityType;

export interface ActivityItem {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: "문화 · 예술" | "교육 · 학습" | "스포츠" | "식음료" | "투어 · 관광" | "게임 · 취미";
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
