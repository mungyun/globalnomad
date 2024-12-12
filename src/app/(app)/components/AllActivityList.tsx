"use client";

import useDeviceType from "@/hooks/useDeviceType";
import { getActivities } from "@/lib/api/Activities";
import AllActivityListSkeleton from "@/skeleton/main/AllActivityListSkeleton";
import usePaginationStore from "@/store/usePaginationStore";
import { GetActivities } from "@/types/ActivityType";
import formatPrice from "@/utils/formatPrice";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";

interface AllActivityListProps {
  sort: string;
  category?: string;
  keyword?: string;
  page: number;
  size: number;
}

const AllActivityList = ({ sort, category, keyword, page, size }: AllActivityListProps) => {
  const deviceType = useDeviceType();
  const { setTotalCount } = usePaginationStore();
  const {
    data: allData,
    isLoading,
    error,
  } = useQuery<GetActivities, Error>({
    queryKey: ["allData", sort, category, keyword, page, size],
    queryFn: () => getActivities({ sort, category, keyword, page, size }),
    staleTime: 60 * 1000 * 10, // 10분
    gcTime: 60 * 1000 * 60, // 1시간 동안 캐시 유지
    enabled: !!deviceType,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (allData?.totalCount) {
      setTotalCount(allData.totalCount);
    }
  }, [allData]);

  if (isLoading) {
    return <AllActivityListSkeleton size={size} />;
  }

  if (error) {
    return (
      <div className="flex h-[397.5px] w-full flex-col items-center justify-center gap-3 md:h-[403px] xl:h-[414px] xl:gap-5">
        <MdErrorOutline className="size-[150px] text-red03 xl:size-[180px]" />
        <span className="text-2xl font-medium text-gray08">Error: {error.message}</span>
      </div>
    );
  }

  if (!allData?.activities?.[0]) {
    return (
      <div className="flex h-[397.5px] w-full flex-col items-center justify-center gap-3 md:h-[403px] xl:h-[414px] xl:gap-5">
        <div className="relative size-[200px] xl:size-[240px]">
          <Image src="/images/empty.png" alt="empty content" fill />
        </div>
        <span className="text-2xl font-medium text-gray08">아직 등록된 체험이 없어요</span>
      </div>
    );
  }

  const { activities } = allData;

  return (
    <>
      <div className="grid grid-cols-2 gap-x-2 gap-y-[5px] md:grid-cols-3 md:gap-x-4 md:gap-y-8 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-12">
        {activities.map((activity) => (
          <Link key={activity.id} href={`/activities/${activity.id}`} className="flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={activity.bannerImageUrl}
                fill
                style={{ objectFit: "cover" }}
                alt="이미지"
                className="rounded-3xl"
                role="img"
              />
            </div>

            <div className="flex flex-col gap-[10px] leading-[26px] text-black03">
              <div className="flex items-center gap-[3px] md:gap-[5px]">
                <Image src="/icons/rating.svg" width={20} height={20} alt="별점 아이콘" />
                <p className="font-medium">
                  {activity.rating} <span className="text-gray07">({activity.reviewCount})</span>
                </p>
              </div>
              <p className="text-[18px] font-semibold md:text-2xl md:leading-[28.64px] xl:leading-8">
                {activity.title}
              </p>
              <p className="mt-[5px] text-xl font-bold leading-8 md:text-[28px] md:leading-[33.41px] xl:text-2xl">
                ₩ {formatPrice(activity.price)}{" "}
                <span className="text-base font-normal leading-[26px] text-gray09 md:text-xl md:leading-[23.87px] xl:leading-8">
                  / 인
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default AllActivityList;
