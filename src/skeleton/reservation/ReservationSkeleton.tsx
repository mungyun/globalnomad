import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ReservationSkeleton = () => {
  return (
    <div className="relative h-screen w-screen max-w-[800px]">
      <Skeleton height={53} width={120} className="mb-5" />
      <Skeleton height={200} className="mb-4" borderRadius={24} count={4} />
    </div>
  );
};

export default ReservationSkeleton;
