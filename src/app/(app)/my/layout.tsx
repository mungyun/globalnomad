import SideNavigation from "@/components/sideNavigation/SideNavigation";
import { defaultMetadata } from "@/utils/metaTag";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "GlobalNomad - 내 정보",
  description: "내 정보를 확인하고 수정할 수 있습니다!",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex justify-center gap-6 px-4 py-6 md:px-5 xl:py-[72px]">
        <SideNavigation />
        {children}
      </div>
    </>
  );
};

export default Layout;
