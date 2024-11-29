import { ActivityList } from "@/types/types";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import IconDropdown from "../dropdown/IconDropdown";

interface ActivityItemProps {
  activity: ActivityList;
}

const ActivityItem = ({ activity }: ActivityItemProps) => {
  const { bannerImageUrl, rating, reviewCount, title, price } = activity;

  return (
    <section className="flex rounded-3xl shadow-md">
      <div className="relative aspect-square w-1/3">
        <Image
          src={bannerImageUrl}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          alt={`${title} 체험 이미지`}
          className="rounded-l-3xl object-cover"
        />
      </div>

      <div className="flex min-h-[128px] flex-1 flex-col justify-between rounded-r-3xl p-3 md:p-4 xl:p-5">
        <div>
          <div className="mb-1 flex gap-2 text-sm md:text-base xl:mb-4">
            <span className="relative -top-[1px] w-4 md:-top-[2px] md:w-5">
              <Image src="/icons/star.svg" sizes="16px" fill alt="평점 별점 아이콘" />
            </span>
            {rating}
            <span className="-ml-1">({reviewCount})</span>
          </div>

          <h3 className="text-sm font-bold md:text-lg xl:text-xl">{title}</h3>
        </div>

        <div className="flex items-end justify-between">
          <span className="flex md:text-xl xl:text-2xl">
            ₩ {formatPrice(price)}
            <span className="ml-2 hidden md:block"> /인</span>
          </span>
          <IconDropdown />
        </div>
      </div>
    </section>
  );
};

export default ActivityItem;
