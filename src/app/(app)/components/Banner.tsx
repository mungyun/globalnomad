"use client";

import { useCarousel } from "@/hooks/useCarousel";
import { getActivities } from "@/lib/api/Activities";
import { GetActivities } from "@/types/ActiviteyType";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const Banner = () => {
  const {
    data: bannerData,
    isLoading,
    error,
  } = useQuery<GetActivities, Error>({
    queryKey: ["bannerData"],
    queryFn: () => getActivities({ sort: "most_reviewed", size: 3 }),
    staleTime: 60 * 1000 * 60, // 1시간
    gcTime: 60 * 1000 * 60 * 24, // 24시간 동안 캐시 유지
  });

  const { carouselRef } = useCarousel({ autoScroll: true, intervalTime: 7000 });

  if (isLoading) {
    return <div className="h-60 w-full md:h-[550px]">Loading...</div>;
  }

  if (error) {
    return <div className="h-60 w-full md:h-[550px]">Error: {error.message}</div>;
  }

  if (!bannerData) {
    return <div className="h-60 w-full md:h-[550px]">배너 데이터가 없습니다.</div>;
  }

  const { activities } = bannerData;
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div ref={carouselRef} className="flex h-60 w-full overflow-auto md:h-[550px]">
      {activities.map((activity) => (
        <section
          key={activity.id}
          className="relative w-full flex-shrink-0 pl-6 pt-[74px] md:pl-8 md:pt-[144px] xl:pl-0 xl:pt-[159px]"
        >
          <div className="absolute left-0 top-0 size-full">
            <Image
              src={activity.bannerImageUrl}
              fill
              priority
              style={{ objectFit: "cover" }}
              alt={`${currentMonth}월의 인기 경험: ${activity.title}`}
            />
          </div>
          <div className="mx-auto flex max-w-[1200px] flex-col gap-2 font-bold text-white xl:gap-5">
            <h1 className="z-10 w-[55vw] whitespace-normal break-keep text-2xl leading-[28.64px] md:text-[54px] md:leading-[64.44px] xl:text-[68px] xl:leading-[81.15px]">
              {activity.title}
            </h1>
            <p className="z-10 text-sm leading-[26px] md:text-xl xl:text-2xl xl:leading-[28.64px]">
              {currentMonth}월의 인기 경험 BEST 🔥
            </p>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Banner;
