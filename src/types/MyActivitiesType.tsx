interface ScheduleCount {
  declined: number;
  confirmed: number;
  pending: number;
}

// 내 체험 날짜별 예약 정보가 있는 스케줄 타입

export interface Schedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: ScheduleCount;
}

export interface Activity {
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

export interface ActivityListResponse {
  cursorId: number;
  totalCount: number;
  activities: Activity[];
}
