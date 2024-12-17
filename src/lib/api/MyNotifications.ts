import { proxy } from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";

// 내 알림 리스트 조회
export const getMyNotifications = async ({
  queryKey,
}: {
  queryKey: [string, { size: number; cursorId: number | undefined }];
}) => {
  const [, { size, cursorId }] = queryKey;

  try {
    let url = `/api/my-notifications?size=${size}`;
    if (cursorId) url += `&cursorId=${cursorId}`;

    const response = await proxy.get(url);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

// 내 알림 삭제
export const deleteMyNotification = async ({ notificationId }: { notificationId: number }) => {
  try {
    const response = await proxy.delete(`/api/my-notifications/${notificationId}`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};
