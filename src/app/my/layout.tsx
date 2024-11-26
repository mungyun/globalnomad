import SideNavigation from "@/components/SideNavigation";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center gap-6 py-10">
      <div className="hidden md:block">
        <SideNavigation />
      </div>
      {children}
    </div>
  );
};

export default Layout;
