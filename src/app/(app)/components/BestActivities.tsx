"use client";

import useDeviceType from "@/hooks/useDeviceType";
import { ActivityItem } from "@/types/types";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { mockData } from "./mockdata";

const ITEMS_PER_BESTPAGE = {
  mobile: 4,
  tablet: 4,
  desktop: 3,
};

const BestActivities = () => {
  const [loadedData, setLoadedData] = useState<ActivityItem[]>([]); // 현재까지 로드된 데이터
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [pageSize, setPageSize] = useState(ITEMS_PER_BESTPAGE.mobile);

  const deviceType = useDeviceType();
  const containerRef = useRef<HTMLDivElement>(null); // 스크롤 감지할 요소

  const filteredData = mockData.activities.sort((a, b) => b.reviewCount - a.reviewCount);

  const loadMoreData = () => {
    if (isLoading) return; // 중복 로딩 방지
    setIsLoading(true);

    setTimeout(() => {
      const currentLength = loadedData.length; // 현재 로드된 데이터 길이
      const nextData = filteredData.slice(currentLength, currentLength + pageSize);
      // 다음 데이터 병합
      setLoadedData((prev) => [...prev, ...nextData]);
      setIsLoading(false);
    }, 100); // 로딩 시뮬레이션
  };

  useEffect(() => {
    // 초기 데이터 로드
    loadMoreData();
  }, []);

  useEffect(() => {
    // 스크롤 이벤트 리스너 추가
    const handleScroll = () => {
      const container = containerRef.current;

      if (container && container.scrollWidth - container.scrollLeft <= container.clientWidth + 150) {
        loadMoreData();
      }
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => container?.removeEventListener("scroll", handleScroll); // 클린업
  }, [loadedData, isLoading]);

  useEffect(() => {
    setPageSize(ITEMS_PER_BESTPAGE[deviceType]);
  }, [deviceType]);

  return (
    <section className="flex flex-col gap-4 pl-4 md:gap-8 md:pl-6 xl:pl-0">
      <h2 className="text-lg font-bold leading-[21.48px] text-black03 md:text-4xl md:leading-[42.96px]">
        🔥 인기 체험
      </h2>
      <div ref={containerRef} className="flex w-full gap-4 overflow-x-auto md:gap-8 xl:gap-6">
        {loadedData.map((activity) => (
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
