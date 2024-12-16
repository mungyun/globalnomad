import { defaultMetadata } from "@/utils/metaTag";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "GlobalNomad - 로그인",
  description: "로그인 이후, GlobalNomad를 경험해보세요!",
};

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default LoginLayout;
