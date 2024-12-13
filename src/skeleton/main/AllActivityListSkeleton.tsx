import Skeleton from "react-loading-skeleton";

const AllActivityListSkeleton = ({ size }: { size: number }) => {
  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-[5px] md:grid-cols-3 md:gap-x-4 md:gap-y-8 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-12">
      {Array.from({ length: size }).map((_, index) => (
        <div key={index} className="w-full">
          <div className="aspect-square">
            <Skeleton height="100%" style={{ borderRadius: "1.5rem" }} />
          </div>
          <div className="mt-4 flex h-[109px] flex-col gap-[10px] md:h-[136px]">
            <div className="h-7 md:h-5">
              <Skeleton height="100%" width="30%" />
            </div>
            <div className="h-[26px] md:h-[58px]">
              <Skeleton height="100%" width="70%" />
            </div>
            <div className="mt-[5px] h-8">
              <Skeleton height="100%" width="50%" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllActivityListSkeleton;
