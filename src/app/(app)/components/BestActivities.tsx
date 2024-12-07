"use client";

import useResponsiveData from "@/hooks/useResponsiveData";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const sort = "mostReviewed";
const ITEMS_PER_PAGE = {
  mobile: 9,
  tablet: 9,
  desktop: 9,
};

const BestActivities = () => {
  const { data, deviceType, page, setPage } = useResponsiveData({ ITEMS_PER_PAGE, sort });

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    if (page < data.length) setPage(page + 1);
  };

  return (
    <section className="flex flex-col gap-4 pl-4 md:gap-8 md:pl-6 xl:pl-0">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold leading-[21.48px] text-black03 md:text-4xl md:leading-[42.96px]">
          🔥 인기 체험
        </h2>
        {deviceType === "desktop" ? (
          <div className="flex gap-3">
            <button
              disabled={page === 1}
              onClick={prevPage}
              className="flex size-11 items-center justify-center disabled:text-gray07"
              aria-label="이전 페이지"
            >
              <SlArrowLeft className="size-[22px]" />
            </button>
            <button
              disabled={page === data.length}
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
      <div className="flex w-full gap-4 overflow-x-auto md:gap-8 xl:gap-6 xl:transition-transform xl:duration-500 xl:ease-in-out">
        {data.map((activity) => (
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
