import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SideBarSkeleton = () => {
  return (
    <div className="relative top-20 rounded-xl border border-gray02 p-6 shadow-md transition-all md:sticky md:h-[423px] md:w-[251px] md:min-w-[251px] xl:h-[746px] xl:w-[384px]">
      <Skeleton height={30} className="mb-4" />
      <Skeleton height={24} width={120} className="mb-6" />
      <Skeleton height={20} width={180} className="mb-4" />
      <Skeleton height={56} width="100%" className="mb-6" />
      <Skeleton height={20} width={80} className="mb-2" />
      <Skeleton height={20} width={80} />
    </div>
  );
};

export default SideBarSkeleton;
