import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BestActivitiesSkeleton = () => {
  return (
    <section className="flex flex-col gap-4 pl-4 md:gap-8 md:pl-6 xl:pl-0">
      <h2 className="text-lg font-bold leading-[21.48px] text-black03 md:text-4xl md:leading-[42.96px]">
        🔥 인기 체험
      </h2>
      <div className="flex w-full gap-4 overflow-hidden md:gap-8 xl:gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="size-[186px] flex-shrink-0 md:size-[384px]">
            <Skeleton height="100%" style={{ borderRadius: "1.5rem" }} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestActivitiesSkeleton;
