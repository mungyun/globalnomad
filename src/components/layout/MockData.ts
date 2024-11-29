import { AlertData } from "@/types/MyNotificationsType";

export const AlertMockData: AlertData = {
  cursorId: 1,
  notifications: [
    {
      id: 1,
      teamId: "team123",
      userId: 101,
      content: "함께하면 즐거운 스트릿 댄스(2025-01-14 15:00~18:00) 예약이 승인되었어요.",
      createdAt: "2024-11-27T09:00:00.000Z",
      updatedAt: "2024-11-27T09:00:00.000Z",
      deletedAt: null,
    },
    {
      id: 2,
      teamId: "team456",
      userId: 102,
      content: "함께하면 즐거운 스트릿 댄스(2025-01-14 15:00~18:00) 예약이 거절되었어요.",
      createdAt: "2024-11-26T09:30:00.000Z",
      updatedAt: "2024-11-28T09:30:00.000Z",
      deletedAt: null,
    },
    {
      id: 3,
      teamId: "team789",
      userId: 103,
      content: "함께하면 즐거운 스트릿 야구(2025-01-14 11:00~14:00) 예약이 거절되었어요.",
      createdAt: "2024-11-28T10:00:00.000Z",
      updatedAt: "2024-11-28T10:00:00.000Z",
      deletedAt: null,
    },
  ],
  totalCount: 3,
};
