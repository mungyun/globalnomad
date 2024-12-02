"use client";

import Dropdown from "@/components/dropdown/Dropdown";
import useDeviceType from "@/hooks/useDeviceType";
import { Dispatch, SetStateAction } from "react";
import CategoryButton from "./CategoryButton";

const OPTIONS = ["가격이 낮은 순", "가격이 높은 순"];
const CATEGORY = ["문화 · 예술", "교육 · 학습", "스포츠", "식음료", "투어 · 관광", "게임 · 취미"];

interface CategoriesProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  query?: string | undefined;
}
const Categories = ({ category, setCategory, query }: CategoriesProps) => {
  const deviceType = useDeviceType();

  return (
    <div className={`mb-6 mt-10 flex justify-between gap-2 md:mb-[35px] md:mt-[60px] ${query ? "hidden" : ""}`}>
      <div className="flex gap-2 overflow-x-auto md:gap-[14px] xl:gap-6">
        {CATEGORY.map((option) => (
          <CategoryButton key={option} active={option === category} onClick={() => setCategory(option)}>
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
