import SideNavigation from "@/components/SideNavigation";
import ActivityList from "@/components/myactivity/ActivityList";

export default function Reservation() {
  return (
    <div className="flex w-full justify-center gap-5 p-4 md:p-6 xl:my-10 xl:gap-9">
      <div className="hidden md:block">
        <SideNavigation />
      </div>
      <ActivityList />
    </div>
  );
}
