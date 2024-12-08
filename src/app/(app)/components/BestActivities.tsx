"use client";

import { useCarousel } from "@/hooks/useCarousel";
import useDeviceType from "@/hooks/useDeviceType";
import { getActivities } from "@/lib/api/Activities";
import { GetActivities } from "@/types/ActivityType";
import { useQuery } from "@tanstack/react-query";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import BestActivityItem from "./BestActivityItem";

const BestActivities = () => {
  const {
    data: bestData,
    isLoading,
    error,
  } = useQuery<GetActivities, Error>({
    queryKey: ["bestData"],
    queryFn: () => getActivities({ sort: "most_reviewed", size: 9 }),
    staleTime: 60 * 1000 * 60, // 1시간
    gcTime: 60 * 1000 * 60 * 24, // 24시간 동안 캐시 유지
  });

  const { carouselRef, scrollToPrevious, scrollToNext, isFirst, isLast } = useCarousel({});
  const deviceType = useDeviceType();

  if (isLoading) {
    return <div className="h-60 w-full md:h-[550px]">로딩중...</div>;
  }
  if (error) {
    return <div className="h-60 w-full md:h-[550px]">Error: {error.message}</div>;
  }
  if (!bestData) {
    return <div className="h-60 w-full md:h-[550px]">배너 데이터가 없습니다.</div>;
  }

  const { activities } = bestData;

  return (
    <section className="flex flex-col gap-4 pl-4 md:gap-8 md:pl-6 xl:pl-0">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold leading-[21.48px] text-black03 md:text-4xl md:leading-[42.96px]">
          🔥 인기 체험
        </h2>
        {deviceType === "desktop" ? (
          <div className="flex gap-3">
            <button
              onClick={scrollToPrevious}
              className="flex size-11 items-center justify-center disabled:text-gray07"
              aria-label="이전 페이지"
              disabled={isFirst}
            >
              <SlArrowLeft className="size-[22px]" />
            </button>
            <button
              onClick={scrollToNext}
              className="flex size-11 items-center justify-center disabled:text-gray07"
              aria-label="다음 페이지"
              disabled={isLast}
            >
              <SlArrowRight className="size-[22px]" />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        ref={carouselRef}
        className="flex w-full gap-4 overflow-x-scroll md:gap-8 xl:gap-6 xl:transition-transform xl:duration-500 xl:ease-in-out"
      >
        {activities.map((activity) => (
          <BestActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </section>
  );
};

export default BestActivities;
