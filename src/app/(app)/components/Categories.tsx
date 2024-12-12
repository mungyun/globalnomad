"use client";

import Dropdown from "@/components/dropdown/Dropdown";
import useDeviceType from "@/hooks/useDeviceType";
import CategoryButton from "./CategoryButton";

const OPTIONS = [
  { label: "가격이 낮은 순", value: "price_asc" },
  { label: "가격이 높은 순", value: "price_desc" },
];
const CATEGORY = ["문화 · 예술", "스포츠", "식음료", "투어", "관광", "웰빙"];

interface CategoriesProps {
  sort: string;
  category: string;
  setSort: (value: string) => void;
  setCategory: (value: string) => void;
}

const Categories = ({ sort, category, setSort, setCategory }: CategoriesProps) => {
  const deviceType = useDeviceType();

  const handleSortSelect = (selectedLabel: string) => {
    const selectedOption = OPTIONS.find((option) => option.label === selectedLabel);
    if (selectedOption) {
      setSort(selectedOption.value);
    }
  };

  return (
    <div className="mb-6 mt-10 flex justify-between gap-2 md:mb-[35px] md:mt-[60px]">
      <div className="flex gap-2 overflow-x-auto md:gap-[14px] xl:gap-6">
        {CATEGORY.map((option) => (
          <CategoryButton key={option} active={option === category} onClick={() => setCategory(option)}>
            {option}
          </CategoryButton>
        ))}
      </div>
      <div className="relative">
        <Dropdown
          label="가격"
          size={deviceType === "mobile" ? "small" : deviceType === "tablet" ? "medium" : "large"}
          optionsArray={OPTIONS}
          onSelect={handleSortSelect}
          sort={sort}
        />
        <div className="absolute left-0 top-1/2 h-[51px] w-[40px] -translate-x-full -translate-y-1/2 bg-gradient-to-r from-gray01/0 via-gray01 to-gray01 md:h-[58px] md:w-[60px]"></div>
      </div>
    </div>
  );
};

export default Categories;
