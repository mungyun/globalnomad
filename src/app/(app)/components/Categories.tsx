"use client";

import Dropdown from "@/components/dropdown/Dropdown";
import useDeviceType from "@/hooks/useDeviceType";
import { useRouter } from "next/navigation";
import CategoryButton from "./CategoryButton";

const OPTIONS = ["가격이 낮은 순", "가격이 높은 순"];
const CATEGORY = ["문화 · 예술", "스포츠", "식음료", "투어", "관광", "웰빙"];

const Categories = ({ currentCategory }: { currentCategory?: string }) => {
  const deviceType = useDeviceType();
  const router = useRouter();

  const handleCategoryClick = (option: string) => {
    router.push(`/?category=${option}&sort=latest`);
  };

  return (
    <div className="mb-6 mt-10 flex justify-between gap-2 md:mb-[35px] md:mt-[60px]">
      <div className="flex gap-2 overflow-x-auto md:gap-[14px] xl:gap-6">
        {CATEGORY.map((option) => (
          <CategoryButton key={option} active={option === currentCategory} onClick={() => handleCategoryClick(option)}>
            {option}
          </CategoryButton>
        ))}
      </div>
      <div className="relative">
        <Dropdown label="가격" size={deviceType === "mobile" ? "small" : "medium"} options={OPTIONS} />
        <div className="absolute left-0 top-1/2 h-[51px] w-[40px] -translate-x-full -translate-y-1/2 bg-gradient-to-r from-gray01/0 via-gray01 to-gray01 md:h-[58px] md:w-[60px]"></div>
      </div>
    </div>
  );
};

export default Categories;
