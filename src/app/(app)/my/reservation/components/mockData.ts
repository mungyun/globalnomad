import { ReservationStatus } from "@/types/types";

interface MockReservation {
  activity: {
    id: number;
    title: string;
    bannerImageUrl: string;
  };
  scheduleId: number;
  id: number;
  teamId: string;
  userId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

interface MockReservationsData {
  totalCount: number;
  reservations: MockReservation[];
  cursorId: number | null;
}

export const mockReservations: MockReservationsData = {
  totalCount: 10,
  reservations: [
    {
      activity: {
        id: 991,
        title: "놀러오세요~ 고양이의 숲",
        bannerImageUrl: "/images/0.jpg",
      },
      scheduleId: 5015,
      id: 5125,
      teamId: "4-14",
      userId: 1281,
      status: "pending",
      reviewSubmitted: false,
      totalPrice: 10000,
      headCount: 1,
      date: "2024-11-23",
      startTime: "16:00",
      endTime: "18:00",
      createdAt: "2024-11-21T22:48:56.195Z",
      updatedAt: "2024-11-21T22:48:56.195Z",
    },
    {
      activity: {
        id: 992,
        title: "놀러와아아~ 강아지의 숲",
        bannerImageUrl: "/images/0.jpg",
      },
      scheduleId: 5015,
      id: 5126,
      teamId: "4-14",
      userId: 1281,
      status: "canceled",
      reviewSubmitted: false,
      totalPrice: 20000,
      headCount: 1,
      date: "2024-12-23",
      startTime: "14:00",
      endTime: "18:00",
      createdAt: "2024-11-21T22:48:56.195Z",
      updatedAt: "2024-11-21T22:48:56.195Z",
    },
    {
      activity: {
        id: 993,
        title: "함께하는 요가 클래스",
        bannerImageUrl: "/images/0.jpg",
      },
      scheduleId: 5016,
      id: 5127,
      teamId: "4-15",
      userId: 1282,
      status: "confirmed",
      reviewSubmitted: true,
      totalPrice: 15000,
      headCount: 2,
      date: "2024-11-25",
      startTime: "10:00",
      endTime: "11:00",
      createdAt: "2024-11-20T15:30:00.000Z",
      updatedAt: "2024-11-21T22:48:56.195Z",
    },
    {
      activity: {
        id: 994,
        title: "플라워 어레인지먼트",
        bannerImageUrl: "/images/0.jpg",
      },
      scheduleId: 5017,
      id: 5128,
      teamId: "4-16",
      userId: 1283,
      status: "refused",
      reviewSubmitted: false,
      totalPrice: 30000,
      headCount: 4,
      date: "2024-11-28",
      startTime: "14:00",
      endTime: "16:00",
      createdAt: "2024-11-19T10:00:00.000Z",
      updatedAt: "2024-11-21T22:48:56.195Z",
    },
    {
      activity: {
        id: 995,
        title: "취미로 즐기는 목공 클래스",
        bannerImageUrl: "/images/0.jpg",
      },
      scheduleId: 5018,
      id: 5129,
      teamId: "4-17",
      userId: 1284,
      status: "completed",
      reviewSubmitted: false,
      totalPrice: 40000,
      headCount: 3,
      date: "2024-12-01",
      startTime: "15:00",
      endTime: "17:00",
      createdAt: "2024-11-15T13:45:00.000Z",
      updatedAt: "2024-11-21T22:48:56.195Z",
    },
    {
      activity: {
        id: 996,
        title: "캘리그라피 원데이 클래스",
        bannerImageUrl: "/images/0.jpg",
      },
      scheduleId: 5019,
      id: 5130,
      teamId: "4-18",
      userId: 1285,
      status: "pending",
      reviewSubmitted: false,
      totalPrice: 12000,
      headCount: 1,
      date: "2024-12-03",
      startTime: "11:00",
      endTime: "12:30",
      createdAt: "2024-11-14T17:00:00.000Z",
      updatedAt: "2024-11-21T22:48:56.195Z",
    },
    {
      activity: {
        id: 997,
        title: "어린이 그림책 만들기",
        bannerImageUrl: "/images/0.jpg",
      },
      scheduleId: 5020,
      id: 5131,
      teamId: "4-19",
      userId: 1286,
      status: "confirmed",
      reviewSubmitted: true,
      totalPrice: 25000,
      headCount: 5,
      date: "2024-12-05",
      startTime: "13:00",
      endTime: "15:30",
      createdAt: "2024-11-13T14:10:00.000Z",
      updatedAt: "2024-11-21T22:48:56.195Z",
    },
    {
      activity: {
        id: 998,
        title: "홈메이드 초콜릿 만들기",
        bannerImageUrl: "/images/0.jpg",
      },
      scheduleId: 5021,
      id: 5132,
      teamId: "4-20",
      userId: 1287,
      status: "canceled",
      reviewSubmitted: false,
      totalPrice: 18000,
      headCount: 2,
      date: "2024-12-07",
      startTime: "10:00",
      endTime: "12:00",
      createdAt: "2024-11-12T12:00:00.000Z",
      updatedAt: "2024-11-21T22:48:56.195Z",
    },
    {
      activity: {
        id: 999,
        title: "도예 체험 클래스",
        bannerImageUrl: "/images/0.jpg",
      },
      scheduleId: 5022,
      id: 5133,
      teamId: "4-21",
      userId: 1288,
      status: "pending",
      reviewSubmitted: false,
      totalPrice: 50000,
      headCount: 6,
      date: "2024-12-10",
      startTime: "16:00",
      endTime: "18:30",
      createdAt: "2024-11-11T09:00:00.000Z",
      updatedAt: "2024-11-21T22:48:56.195Z",
    },
    {
      activity: {
        id: 1000,
        title: "바리스타 클래스 체험",
        bannerImageUrl: "/images/0.jpg",
      },
      scheduleId: 5023,
      id: 5134,
      teamId: "4-22",
      userId: 1289,
      status: "confirmed",
      reviewSubmitted: true,
      totalPrice: 45000,
      headCount: 4,
      date: "2024-12-15",
      startTime: "10:30",
      endTime: "12:30",
      createdAt: "2024-11-10T08:30:00.000Z",
      updatedAt: "2024-11-21T22:48:56.195Z",
    },
  ],
  cursorId: null,
};
