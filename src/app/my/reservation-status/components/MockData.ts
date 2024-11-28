import { ActivityListResponse, ReservationList, Schedule } from "@/types/MyActivitiesType";

export const ActivityListMockData: ActivityListResponse = {
  cursorId: 1,
  totalCount: 3,
  activities: [
    {
      id: 1,
      userId: 101,
      title: "산악 등산 체험",
      description: "아름다운 산악 트레일을 따라가는 가이드 투어입니다.",
      category: "야외활동",
      price: 50000,
      address: "모험 도시, 123 산악 트레일",
      bannerImageUrl: "https://example.com/images/hiking.jpg",
      rating: 4.8,
      reviewCount: 120,
      createdAt: "2024-11-20T10:00:00.000Z",
      updatedAt: "2024-11-22T15:00:00.000Z",
    },
    {
      id: 2,
      userId: 102,
      title: "요리 교실: 이탈리아 요리",
      description: "전문 셰프와 함께하는 정통 이탈리아 요리 배우기.",
      category: "요리",
      price: 80000,
      address: "푸드 타운, 456 요리 거리",
      bannerImageUrl: "https://example.com/images/cooking.jpg",
      rating: 4.9,
      reviewCount: 95,
      createdAt: "2024-11-21T12:00:00.000Z",
      updatedAt: "2024-11-23T14:00:00.000Z",
    },
    {
      id: 3,
      userId: 103,
      title: "사진 촬영 워크숍",
      description: "전문가와 함께하는 실습형 사진 촬영 기술 익히기.",
      category: "워크숍",
      price: 100000,
      address: "셔터 도시, 789 스냅샷 거리",
      bannerImageUrl: "https://example.com/images/photography.jpg",
      rating: 4.7,
      reviewCount: 75,
      createdAt: "2024-11-22T09:00:00.000Z",
      updatedAt: "2024-11-24T16:00:00.000Z",
    },
  ],
};

interface Reservation {
  completed: number;
  confirmed: number;
  pending: number;
}

interface ReservationData {
  date: string;
  reservations: Reservation;
}

export const ReservationMockData: ReservationData[] = [
  {
    date: "2024-11-01",
    reservations: {
      completed: 2,
      confirmed: 3,
      pending: 1,
    },
  },
  {
    date: "2024-11-12",
    reservations: {
      completed: 1,
      confirmed: 2,
      pending: 0,
    },
  },
  {
    date: "2024-11-23",
    reservations: {
      completed: 0,
      confirmed: 1,
      pending: 2,
    },
  },
  {
    date: "2024-12-04",
    reservations: {
      completed: 5,
      confirmed: 0,
      pending: 1,
    },
  },
  {
    date: "2024-12-10",
    reservations: {
      completed: 3,
      confirmed: 4,
      pending: 2,
    },
  },
];

export const SchedulemockData: Schedule[] = [
  {
    scheduleId: 1,
    startTime: "2024-11-27T10:00:00.000Z",
    endTime: "2024-11-27T12:00:00.000Z",
    count: {
      declined: 1,
      confirmed: 2,
      pending: 3,
    },
  },
  {
    scheduleId: 2,
    startTime: "2024-11-27T14:00:00.000Z",
    endTime: "2024-11-27T16:00:00.000Z",
    count: {
      declined: 0,
      confirmed: 5,
      pending: 1,
    },
  },
];

export const ReservationListMockData: ReservationList = {
  cursorId: 1,
  totalCount: 3,
  reservations: [
    {
      id: 1,
      nickname: "JohnDoe",
      userId: 101,
      teamId: "TeamAlpha",
      activityId: 201,
      scheduleId: 301,
      status: "pending",
      reviewSubmitted: false,
      totalPrice: 10000,
      headCount: 2,
      date: "2024-11-27",
      startTime: "10:00",
      endTime: "12:00",
      createdAt: "2024-11-27T05:39:46.199Z",
      updatedAt: "2024-11-27T05:39:46.199Z",
    },
    {
      id: 2,
      nickname: "JaneSmith",
      userId: 102,
      teamId: "TeamBeta",
      activityId: 202,
      scheduleId: 302,
      status: "confirmed",
      reviewSubmitted: true,
      totalPrice: 20000,
      headCount: 4,
      date: "2024-11-28",
      startTime: "14:00",
      endTime: "16:00",
      createdAt: "2024-11-27T05:40:00.199Z",
      updatedAt: "2024-11-27T05:40:00.199Z",
    },
  ],
};
