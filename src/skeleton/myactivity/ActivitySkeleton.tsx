import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ActivitySkeleton = () => {
  return (
    <div className="relative h-screen w-screen max-w-[800px]">
      <div className="flex justify-between">
        <Skeleton height={48} width={160} className="mb-5" />
        <Skeleton height={48} width={120} className="mb-5" />
      </div>
      <Skeleton height={200} className="mb-4" borderRadius={24} count={4} />
    </div>
  );
};

export default ActivitySkeleton;
