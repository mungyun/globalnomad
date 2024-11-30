"use client";

import { getActivityDetail } from "@/lib/api/Activities";
import { ActivityDetail } from "@/types/ActiviteyType";
import { useQuery } from "@tanstack/react-query";
import CommentList from "./CommentList";
import KakaoMap from "./KakaoMap";

const MainContent = ({ id }: { id: number }) => {
  const {
    data: activityDetail,
    isPending,
    isError,
  } = useQuery<ActivityDetail, Error>({
    queryKey: ["activityDetail", id],
    queryFn: () => getActivityDetail(id),
    enabled: !!id,
    staleTime: 60 * 5 * 1000, // 5분에 한 번씩 데이터 교체
  });

  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>활동을 가져오는 데 실패했습니다.</div>;
  }

  if (!activityDetail) {
    return <div>활동을 찾을 수 없습니다.</div>;
  }

  const { description, address } = activityDetail;

  return (
    <div>
      <div className="w-full px-4 md:border-t md:border-t-gray08 md:p-6 xl:max-w-[790px] xl:p-0">
        <div className="border-b border-b-gray08 pb-4 md:pb-10 xl:pb-[34px] xl:pt-10">
          <h3 className="mb-4 text-[20px] font-bold text-black02">체험 설명</h3>
          <p className="text-[16px] text-gray08">{description}</p>
        </div>
        <div className="z-0 pt-4 md:border-b md:border-b-gray08 md:py-10">
          <KakaoMap address={address} />
        </div>
        <CommentList />
      </div>
    </div>
  );
};

export default MainContent;
