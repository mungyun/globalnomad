"use client";

import Pagination from "@/components/Pagination";
import useResponsiveData from "@/hooks/useResponsiveData";
import formatPrice from "@/utils/formatPrice";
import getJosa from "@/utils/getJosa";
import Image from "next/image";
import Link from "next/link";

interface AllactivitiesProps {
  category?: string;
  keyword?: string;
  sort?: string;
}

const ITEMS_PER_PAGE = {
  mobile: 4,
  tablet: 9,
  desktop: 8,
};

const AllActivities = ({ category, keyword, sort }: AllactivitiesProps) => {
  const { data, totalCount, deviceType, page, setPage } = useResponsiveData({
    ITEMS_PER_PAGE,
    category,
    keyword,
    sort,
  });

  return (
    <>
      <div className="mb-[38px] flex flex-col gap-6 text-black03 md:mb-[72px] md:gap-8 xl:mb-16">
        {keyword ? (
          <div className="flex flex-col gap-3">
            <p className="text-2xl leading-[28.64px] text-black02 md:text-[32px] md:leading-[38.19px]">
              <span className="font-bold">{keyword}</span>
              {getJosa(keyword)} 검색한 결과입니다.
            </p>
            <p className="leading-[26px]">총 {totalCount}개의 결과</p>
          </div>
        ) : (
          <p className="text-lg font-bold leading-[21.48px] text-black03 md:text-4xl md:leading-[42.96px]">
            {category ? category : "🛶 모든 체험"}
          </p>
        )}
        <div className="grid grid-cols-2 gap-x-2 gap-y-[5px] md:grid-cols-3 md:gap-x-4 md:gap-y-8 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-12">
          {data.map((activity) => (
            <Link key={activity.id} href={`/activities/${activity.id}`} className="flex flex-col gap-4">
              {/* 이미지 대신 */}
              <div className="aspect-square w-full rounded-3xl bg-slate-400"></div>
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
      </div>
      <Pagination
        totalCount={totalCount}
        itemsPerPage={ITEMS_PER_PAGE[deviceType]}
        currentPage={page}
        setCurrentPage={setPage}
      />
    </>
  );
};

export default AllActivities;
