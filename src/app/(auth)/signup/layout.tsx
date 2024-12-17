import { defaultMetadata } from "@/utils/metaTag";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "GlobalNomad - 회원가입",
  description: "GlobalNomad를 유저가 되어 새로운 경험을 해보세요!",
};

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default LoginLayout;
