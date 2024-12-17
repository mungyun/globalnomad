import { proxy } from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";

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
