import NavigationProfile from "./NavigatioProfile";
import NavigationMenu from "./NavigationMenu";

export default function SideNavigation() {
  return (
    <div className="fixed bottom-0 z-10 flex w-screen flex-col gap-5 overflow-visible border border-gray03 bg-white py-3 shadow-md md:sticky md:top-10 md:h-[432px] md:w-[251px] md:min-w-[251px] md:rounded-xl md:p-6 xl:w-[384px]">
      <NavigationProfile />
      <NavigationMenu />
    </div>
  );
}
