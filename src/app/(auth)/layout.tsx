import Image from "next/image";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-6 px-3 pb-14 pt-10 md:px-[52px] md:pb-[70px] md:pt-12 xl:pb-[54px]">
      <div className="relative h-[154px] w-[270px] md:mb-8 md:h-[192px] md:w-[340px]">
        <Image src="/icons/logo_big.svg" priority fill alt="로고 이미지" />
      </div>

      {children}
    </div>
  );
};

export default AuthLayout;