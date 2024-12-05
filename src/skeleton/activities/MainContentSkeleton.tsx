import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MainContentSkeleton = () => {
  return (
    <div className="w-full p-4">
      <Skeleton height={30} width={`75%`} className="mb-4" />
      <div className="mb-4 flex items-center gap-4">
        <Skeleton circle={true} height={50} width={50} />
        <div className="flex flex-col">
          <Skeleton height={20} width={`100%`} className="mb-2" />
          <Skeleton height={15} width={`100%`} />
        </div>
      </div>
      <Skeleton height={20} className="mb-2" />
      <Skeleton height={20} className="mb-2" />
      <Skeleton height={20} className="mb-2" />
      <Skeleton height={30} width={`25%`} />
    </div>
  );
};

export default MainContentSkeleton;
