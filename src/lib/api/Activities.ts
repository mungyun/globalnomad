import axiosInstance from "./axiosInstanceApi";

// 체험 리스트 조회
export const getActivities = async ({
  method = "cursor",
  cursorId,
  category,
  keyword,
  sort = "latest",
  page,
  size,
}: {
  method?: string;
  cursorId?: number;
  category?: string;
  keyword?: string;
  sort?: string;
  page?: number;
  size?: number;
}) => {
  try {
    const response = await axiosInstance.get("/activities", {
      params: {
        ...(method && { method }),
        ...(cursorId && { cursorId }),
        ...(category && { category }),
        ...(keyword && { keyword }),
        ...(sort && { sort }),
        ...(page && { page }),
        ...(size && { size }),
      },
    });

    return response.data;
  } catch (error) {
    console.error("체험 리스트 조회 오류: ", error);
  }
};
