"use client";

import useDeviceType from "@/hooks/useDeviceType";
import { getActivityDetail } from "@/lib/api/Activities";
import { getUsersProfile } from "@/lib/api/MyPage";
// 유저 정보 조회 함수
import BannerSkeleton from "@/skeleton/activities/BannerSkeleton";
import { ActivityDetail } from "@/types/ActivityType";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import Carousel from "./Carousel";
import Dropdown from "./Dropdown";
import ImageModal from "./ImageModal";

const Banner = ({ id }: { id: number }) => {
  const deviceType = useDeviceType();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    data: activityDetailData,
    isPending: isActivityPending,
    isError: isActivityError,
  } = useQuery<ActivityDetail, Error>({
    queryKey: ["activityDetailData", id],
    queryFn: () => getActivityDetail(Number(id)),
    enabled: !!id,
    staleTime: 60 * 5 * 1000, // 5분에 한 번씩 데이터 교체
  });

  const {
    data: userProfileData,
    isPending: isProfilePending,
    isError: isProfileError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUsersProfile,
    staleTime: 60 * 5 * 1000, // 5분 동안 데이터 유지
  });

  if (isActivityPending || isProfilePending) {
    return <BannerSkeleton />;
  }

  if (isActivityError || isProfileError) {
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }

  if (!activityDetailData || !userProfileData) {
    return <div>활동 또는 유저 정보를 찾을 수 없습니다.</div>;
  }

  const { category, title, rating, reviewCount, address, bannerImageUrl, subImages, userId } = activityDetailData;

  const images = [
    { src: bannerImageUrl, alt: "배너 이미지" },
    ...subImages.map((item) => ({ src: item.imageUrl, alt: "보조 이미지" })),
  ];

  const openModal = (src: string) => setSelectedImage(src);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className="my-4 md:mb-8 md:mt-6 xl:mb-[85px] xl:mt-[78px]">
      <div className="px-4 md:px-0">
        <span className="mb-[10px] text-[14px] text-black02">{category}</span>
        <div className="mb-4 flex justify-between">
          <h2 className="text-[24px] font-bold text-black02 md:text-[32px]">{title}</h2>
          {userProfileData.id === userId && <Dropdown id={id} />}
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
            className="w-full cursor-pointer object-cover md:max-h-[534px] md:rounded-l-xl"
            onClick={() => openModal(bannerImageUrl)}
          />
          <div className="h-full w-full overflow-hidden rounded-r-xl sm:max-h-[310px] md:grid md:max-h-[534px] md:grid-cols-2 md:grid-rows-2 md:gap-1 xl:gap-2">
            {subImages.map((item) => (
              <Image
                src={item.imageUrl}
                alt={`보조 이미지 ${item.id}`}
                width={375}
                height={310}
                key={item.id}
                className="h-full w-full cursor-pointer object-cover md:max-h-[263px]"
                onClick={() => openModal(item.imageUrl)}
              />
            ))}
          </div>
        </div>
      )}

      {selectedImage && <ImageModal selectedImage={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default Banner;
