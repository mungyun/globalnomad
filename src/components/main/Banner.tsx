import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative h-60 pl-6 pt-[74px]">
      <div className="absolute left-0 top-0 size-full">
        <Image src="/images/banner1.png" fill priority style={{ objectFit: "cover" }} alt="메인 페이지 배너 이미지" />
      </div>
      <div className="flex w-fit flex-col gap-2 font-bold text-white">
        <h1 className="text-2xl leading-[28.64px]">
          함께 배우면 즐거운
          <br />
          스트릿 댄스
        </h1>
        <p className="text-sm leading-[26px]">1월의 인기 경험 BEST</p>
      </div>
    </div>
  );
};

export default Banner;
