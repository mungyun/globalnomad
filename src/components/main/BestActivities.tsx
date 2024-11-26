import { ActivityItem } from "@/types/types";

interface BestActivitiesProps {
  bestActivities: ActivityItem[];
}

const BestActivities = ({ bestActivities }: BestActivitiesProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold leading-[21.48px] text-black03">🔥 인기 체험</h2>
      <div className="flex w-full gap-4 overflow-scroll">
        {bestActivities.map((activity) => (
          <div key={activity.id} className="rounded-3xl bg-gray09">
            <div className="flex size-[186px] flex-col gap-[6px] px-5 pt-12 text-white">
              <p className="text-sm font-semibold leading-6">
                {activity.rating} ({activity.reviewCount})
              </p>
              <p className="text-lg font-bold leading-[26px]">{activity.title}</p>
              <p className="text-base font-bold leading-[26px]">
                ₩ {activity.price} <span className="text-sm font-normal leading-6 text-gray07">/ 인</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestActivities;
