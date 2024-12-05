import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BannerSkeleton = () => {
  return (
    <div className="my-4 md:mb-8 md:mt-6 xl:mb-[85px] xl:mt-[78px]">
      <div className="px-4 md:px-0">
        <Skeleton width={80} height={20} className="mb-[10px]" />
        <div className="mb-4 flex justify-between">
          <Skeleton width="60%" height={32} />
          <Skeleton width={40} height={32} />
        </div>
        <div className="mb-[25px] flex gap-3">
          <div className="flex gap-[6px]">
            <Skeleton circle={true} width={16} height={16} />
            <Skeleton width={80} height={16} />
          </div>
          <div className="flex gap-[2px]">
            <Skeleton circle={true} width={18} height={18} />
            <Skeleton width={120} height={16} />
          </div>
        </div>
      </div>
      <Skeleton height={350} />
    </div>
  );
};

export default BannerSkeleton;
