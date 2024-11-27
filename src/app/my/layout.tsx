import SideNavigation from "@/components/SideNavigation";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center gap-6 py-6 xl:py-[72px]">
      <div className="hidden md:block">
        <SideNavigation />
      </div>
      {children}
    </div>
  );
};

export default Layout;