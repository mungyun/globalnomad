"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BANNER_DATA = [
  {
    id: 0,
    bannerImageUrl:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/9-1_1279_1735187757263.jpeg",
    title: "무한한 체험, 색다른 활동",
    content: "전국의 체험 / 활동을 카테고리별로 찾아보세요",
  },
  {
    id: 1,
    bannerImageUrl:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/9-1_1279_1735195164446.jpeg",
    title: "버튼 하나로 예약 완료",
    content: "원하는 체험을 손쉽게 검색하고 예약까지 한 번에!",
  },
  {
    id: 2,
    bannerImageUrl:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/9-1_1279_1735195192130.jpeg",
    title: "나만의 활동 등록",
    content: "모두의 기억에 남을 특별한 체험을 만들어 시작해보세요",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNER_DATA.length); // 다음 배너로 전환
    }, 4000); // 배너 전환 간격 (4초)

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 클리어
  }, []);

  return (
    <div className="relative h-60 w-full overflow-hidden md:h-[550px]">
      {BANNER_DATA.map((banner, index) => (
        <section
          key={index}
          className={`absolute left-0 top-0 size-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        >
          <div key={index} className="relative size-full pl-6 pt-[74px] md:pl-8 md:pt-[144px] xl:pl-0 xl:pt-[159px]">
            <div className="absolute left-0 top-0 -z-10 size-full">
              <Image
                src={banner.bannerImageUrl}
                fill
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                style={{ objectFit: "cover" }}
                alt={`${banner.title} 이미지`}
              />
            </div>
            <div className="mx-auto flex max-w-[1200px] flex-col gap-2 font-bold text-white xl:gap-5">
              <h2 className="w-[55vw] whitespace-normal break-keep text-2xl leading-[28.64px] md:text-[54px] md:leading-[64.44px] xl:text-[68px] xl:leading-[81.15px]">
                {banner.title}
              </h2>
              <span className="w-fit text-sm leading-[26px] md:text-xl xl:text-2xl xl:leading-[28.64px]">
                {banner.content}
              </span>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Banner;
