import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BannerSkeleton = () => {
  return (
    <div className="h-60 w-full pl-6 pt-[74px] md:h-[550px] md:pl-8 md:pt-[144px] xl:pl-0 xl:pt-[159px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-2 h-7 w-[55vw] md:h-16 xl:mb-5 xl:h-[81px]">
          <Skeleton height="100%" />
        </div>
        <div className="h-[26px] w-40 md:h-7 md:w-[214px] xl:w-[257px]">
          <Skeleton />
        </div>
      </div>
    </div>
  );
};

export default BannerSkeleton;
