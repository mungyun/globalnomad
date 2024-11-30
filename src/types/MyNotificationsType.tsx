export interface Notification {
  id: number; // 알림 ID
  teamId: string; // 팀 ID
  userId: number; // 사용자 ID
  content: string; // 알림 내용
  createdAt: string; // 생성 날짜 및 시간
  updatedAt: string; // 업데이트 날짜 및 시간
  deletedAt: string | null; // 삭제 날짜 및 시간 (null 가능)
}

export interface AlertData {
  cursorId: number; // 커서 ID (페이징 처리 등에서 사용)
  notifications: Notification[]; // 알림 리스트
  totalCount: number; // 총 알림 수
}
