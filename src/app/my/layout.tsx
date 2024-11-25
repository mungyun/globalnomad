import SideNavigation from "@/components/SideNavigation";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="my-10 flex justify-center gap-6">
      <div className="hidden md:block">
        <SideNavigation />
      </div>
      {children}
    </div>
  );
};

export default Layout;
