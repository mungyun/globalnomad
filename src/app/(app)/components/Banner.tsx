import Image from "next/image";

const IMAGE_URL =
  "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/9-1_1279_1732781341207.png";

const Banner = () => {
  return (
    <section className="relative h-60 w-full pl-6 pt-[74px] md:h-[550px] md:pl-8 md:pt-[144px] xl:pl-0 xl:pt-[159px]">
      <div className="absolute left-0 top-0 size-full">
        <Image src={IMAGE_URL} fill priority style={{ objectFit: "cover" }} alt="메인 페이지 배너 이미지" />
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-col gap-2 font-bold text-white xl:gap-5">
        <h1 className="z-10 text-2xl leading-[28.64px] md:text-[54px] md:leading-[64.44px] xl:text-[68px] xl:leading-[81.15px]">
          함께 배우면 즐거운
          <br />
          스트릿 댄스
        </h1>
        <p className="z-10 text-sm leading-[26px] md:text-xl xl:text-2xl xl:leading-[28.64px]">
          12월의 인기 경험 BEST 🔥
        </p>
      </div>
    </section>
  );
};

export default Banner;
