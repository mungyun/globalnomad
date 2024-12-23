import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { defaultMetadata } from "@/utils/metaTag";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  ...defaultMetadata,
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
