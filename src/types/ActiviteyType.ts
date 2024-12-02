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
