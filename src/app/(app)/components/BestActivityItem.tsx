import { ActivityItem } from "@/types/ActivityType";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";

interface BestActivityItemProps {
  activity: ActivityItem;
}
const BestActivityItem = ({ activity }: BestActivityItemProps) => {
  return (
    <Link
      href={`/activities/${activity.id}`}
      className="relative rounded-3xl"
      aria-label={`체험 상세 페이지: ${activity.title}`}
    >
      <div className="absolute left-0 top-0 size-full">
        <Image
          src={activity.bannerImageUrl}
          fill
          style={{ objectFit: "cover" }}
          alt={`${activity.title} - 가격: ₩${formatPrice(activity.price)}, 별점: ${activity.rating}`}
          className="-z-10 rounded-3xl"
          role="img"
        />
      </div>
      <div className="flex size-[186px] flex-col gap-[6px] px-5 pt-12 text-white md:size-[384px] md:gap-5 md:pt-[174px]">
        <div className="flex items-center gap-[5px]">
          <Image src="/icons/rating.svg" width={18} height={18} alt="별점 아이콘" />
          <p className="text-sm font-semibold leading-6">
            {activity.rating} ({activity.reviewCount})
          </p>
        </div>
        <p className="whitespace-normal break-keep text-lg font-bold leading-[26px] md:text-[32px] md:leading-[42px]">
          {activity.title}
        </p>
        <p className="text-base font-bold leading-[26px] md:text-xl md:leading-8">
          ₩ {formatPrice(activity.price)} <span className="text-sm font-normal leading-6 text-gray07">/ 인</span>
        </p>
      </div>
    </Link>
  );
};
export default BestActivityItem;
