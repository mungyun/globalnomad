import { proxy } from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";

export const getMyNotifications = async ({
  queryKey,
}: {
  queryKey: [string, { size: number; cursorId: number | undefined }];
}) => {
  const [, { size, cursorId }] = queryKey; // queryKey에서 필요한 데이터 추출

  try {
    let url = `/api/my-notifications?size=${size}`;
    if (cursorId) url += `&cursorId=${cursorId}`;

    const response = await proxy.get(url);
    return response.data; // 데이터를 그대로 반환
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "알림 데이터를 가져오는 중 오류 발생");
    }
    throw new Error("알림 데이터를 가져오는 중 알 수 없는 오류 발생");
  }
};
