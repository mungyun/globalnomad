// 스케줄 타입
export interface Schedule {
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
  schedules: Schedule[];
  bannerImageUrl?: string;
  subImageUrls?: File[];
  bannerImageFile?: File;
  subImageFiles?: File[];
}
