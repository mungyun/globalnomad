import ReservationList from "@/components/ReservationList";
import SideNavigation from "@/components/SideNavigation";

export default function Reservation() {
  return (
    <div className="flex justify-center gap-6">
      <div className="hidden md:block">
        <SideNavigation />
      </div>
      <div>
        <ReservationList />
      </div>
    </div>
  );
}
