"use client";

import { useCarousel } from "@/hooks/useCarousel";
import useDeviceType from "@/hooks/useDeviceType";
import { getActivities } from "@/lib/api/Activities";
import { GetActivities } from "@/types/ActivityType";
import formatPrice from "@/utils/formatPrice";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

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

  const { carouselRef, scrollToFirst, scrollToNext } = useCarousel({});
  const deviceType = useDeviceType();

  const prevPage = () => {
    scrollToFirst();
  };

  const nextPage = () => {
    scrollToNext();
  };

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
              // disabled={page === 1}
              onClick={prevPage}
              className="flex size-11 items-center justify-center disabled:text-gray07"
              aria-label="이전 페이지"
            >
              <SlArrowLeft className="size-[22px]" />
            </button>
            <button
              // disabled={page === data.length}
              onClick={nextPage}
              className="flex size-11 items-center justify-center disabled:text-gray07"
              aria-label="다음 페이지"
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
        className="flex w-full gap-4 overflow-x-auto md:gap-8 xl:gap-6 xl:transition-transform xl:duration-500 xl:ease-in-out"
      >
        {activities.map((activity) => (
          <Link key={activity.id} href={`/activities/${activity.id}`} className="rounded-3xl bg-gray09">
            <div className="flex size-[186px] flex-col gap-[6px] px-5 pt-12 text-white md:size-[384px] md:gap-5 md:pt-[174px]">
              <div className="flex items-center gap-[5px]">
                <Image src="/icons/rating.svg" width={18} height={18} alt="별점 아이콘" />
                <p className="text-sm font-semibold leading-6">
                  {activity.rating} ({activity.reviewCount})
                </p>
              </div>
              <p className="text-lg font-bold leading-[26px] md:text-[32px] md:leading-[42px]">{activity.title}</p>
              <p className="text-base font-bold leading-[26px] md:text-xl md:leading-8">
                ₩ {formatPrice(activity.price)} <span className="text-sm font-normal leading-6 text-gray07">/ 인</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BestActivities;
