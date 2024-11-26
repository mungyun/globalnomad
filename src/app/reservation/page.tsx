import ReservationList from "@/components/ReservationList";
import SideNavigation from "@/components/SideNavigation";

export default function Reservation() {
  return (
    <div className="my-10 flex justify-center gap-6">
      <div className="hidden md:block">
        <SideNavigation />
      </div>
      <ReservationList />
    </div>
  );
}
