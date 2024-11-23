import Image from "next/image";
import Dropdown from "./Dropdown";
import { mockData } from "./mockdata";

const Banner = () => {
  const { category, title, rating, reviewCount, address, bannerImageUrl, subImages } = mockData;

  return (
    <div className="my-4 md:mb-8 md:mt-6 xl:mb-[85px] xl:mt-[78px]">
      <div className="px-4 md:px-0">
        <span className="mb-[10px] text-[14px] text-black02">{category}</span>
        <div className="mb-4 flex justify-between">
          <h2 className="text-[24px] font-bold text-black02 md:text-[32px]">{title}</h2>
          <Dropdown />
        </div>
        <div className="mb-[25px] flex gap-3">
          <div className="flex gap-[6px]">
            <Image src="/icons/star.svg" alt="별" width={16} height={16} />
            <span className="text-[14px]">
              {rating} ({reviewCount})
            </span>
          </div>
          <div className="flex gap-[2px]">
            <Image src="/icons/location.svg" alt="별" width={18} height={18} />
            <span className="text-[14px] text-black02">{address}</span>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center gap-1 md:rounded-xl xl:gap-2">
        <Image
          src={bannerImageUrl}
          alt="배너 이미지"
          width={375}
          height={310}
          className="h-full w-full object-cover md:max-h-[534px] md:max-w-[50%] md:rounded-l-xl"
        />
        <div className="hidden rounded-r-xl md:grid md:grid-cols-2 md:grid-rows-2 md:gap-1 xl:gap-2">
          {subImages.map((item) => (
            <Image
              src={item.imageUrl}
              alt="보조 이미지"
              width={375}
              height={310}
              key={item.id}
              className="h-full w-full object-cover md:max-h-[263px] md:max-w-[293px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
