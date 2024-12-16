import Header from "@/components/layout/Header";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="flex h-[calc(100dvh-70px)] flex-col items-center justify-center gap-6">
        <Image src="/icons/logo_big.svg" className="h-[154px] w-[270px]" width={0} height={0} alt="logo" />
        <div className="text-center">
          <h2 className="text-lg font-bold">페이지를 찾을 수 없습니다.</h2>
          <p>경로를 다시 확인해주세요!</p>
        </div>
        <Link
          className="flex h-[48px] w-[350px] items-center justify-center rounded-md bg-green02 text-base font-bold leading-[26px] text-white"
          href="/"
        >
          메인화면으로
        </Link>
      </div>
    </>
  );
};

export default NotFound;
