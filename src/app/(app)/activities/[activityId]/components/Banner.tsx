"use client";

import useDeviceType from "@/hooks/useDeviceType";
import { getActivityDetail } from "@/lib/api/Activities";
import BannerSkeleton from "@/skeleton/activities/BannerSkeleton";
import { ActivityDetail } from "@/types/ActivityType";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Carousel from "./Carousel";
import Dropdown from "./Dropdown";

const Banner = ({ id }: { id: number }) => {
  const deviceType = useDeviceType();

  const {
    data: activityDetailData,
    isPending,
    isError,
  } = useQuery<ActivityDetail, Error>({
    queryKey: ["activityDetailData", id],
    queryFn: () => getActivityDetail(Number(id)),
    enabled: !!id,
    staleTime: 60 * 5 * 1000, // 5분에 한 번씩 데이터 교체
  });

  if (isPending) {
    return <BannerSkeleton />;
  }

  if (isError) {
    return <div>활동을 가져오는 데 실패했습니다.</div>;
  }

  if (!activityDetailData) {
    return <div>활동을 찾을 수 없습니다.</div>;
  }

  const { category, title, rating, reviewCount, address, bannerImageUrl, subImages } = activityDetailData;

  const images = [
    { src: bannerImageUrl, alt: "배너 이미지" },
    ...subImages.map((item) => ({ src: item.imageUrl, alt: "보조 이미지" })),
  ];

  return (
    <div className="my-4 md:mb-8 md:mt-6 xl:mb-[85px] xl:mt-[78px]">
      <div className="px-4 md:px-0">
        <span className="mb-[10px] text-[14px] text-black02">{category}</span>
        <div className="mb-4 flex justify-between">
          <h2 className="text-[24px] font-bold text-black02 md:text-[32px]">{title}</h2>
          <Dropdown id={id} />
        </div>
        <div className="mb-[25px] flex gap-3">
          <div className="flex gap-[6px]">
            <Image src="/icons/star.svg" alt="별" width={16} height={16} />
            <span className="text-[14px]">
              {rating} ({reviewCount})
            </span>
          </div>
          <div className="flex gap-[2px]">
            <Image src="/icons/location.svg" alt="위치" width={18} height={18} />
            <span className="text-[14px] text-black02">{address}</span>
          </div>
        </div>
      </div>
      {deviceType === "mobile" ? (
        <Carousel images={images} />
      ) : (
        <div className="relative flex h-full w-full justify-center gap-1 md:rounded-xl xl:gap-2">
          <Image
            src={bannerImageUrl}
            alt="배너 이미지"
            width={375}
            height={310}
            className="w-full object-cover md:max-h-[534px] md:rounded-l-xl"
          />
          <div className="h-full w-full overflow-hidden rounded-r-xl sm:max-h-[310px] md:grid md:max-h-[534px] md:grid-cols-2 md:grid-rows-2 md:gap-1 xl:gap-2">
            {subImages.map((item) => (
              <Image
                src={item.imageUrl}
                alt={`보조 이미지 ${item.id}`}
                width={375}
                height={310}
                key={item.id}
                className="h-full w-full object-cover md:max-h-[263px]"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
