"use client";

import AllActivities from "@/app/(app)/components/AllActivities";
import Banner from "@/app/(app)/components/Banner";
import BestActivities from "@/app/(app)/components/BestActivities";
import CategoryButton from "@/app/(app)/components/CategoryButton";
import SearchBar from "@/app/(app)/components/SearchBar";
import { mockData } from "@/app/(app)/components/mockdata";
import Pagination from "@/components/Pagination";
import Dropdown from "@/components/dropdown/Dropdown";
import useDeviceType from "@/hooks/useDeviceType";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = {
  mobile: 4,
  tablet: 9,
  desktop: 8,
};

const OPTIONS = ["가격이 낮은 순", "가격이 높은 순"];
const CATEGORY = ["문화 · 예술", "교육 · 학습", "스포츠", "식음료", "투어 · 관광", "게임 · 취미"];

const Home = () => {
  const [currentCategory, setCurrentCategory] = useState("");
  const [filteredData, setFilteredData] = useState(mockData.activities);
  const [query, setQuery] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();

  const deviceType = useDeviceType();

  useEffect(() => {
    // 쿼리 매개변수 'query'에 접근
    const queryValue = searchParams.get("query");
    if (queryValue) {
      setQuery(queryValue); // 쿼리 값이 있으면 상태를 업데이트
    } else {
      setQuery(undefined); // 쿼리 값이 없으면 기본 상태로 초기화
      setFilteredData(mockData.activities); // 전체 데이터를 초기화
    }
  }, [searchParams]);

  useEffect(() => {
    if (currentCategory !== "") {
      const filtered = mockData.activities.filter((data) => data.category === currentCategory);
      setFilteredData(filtered);
    }
  }, [currentCategory]);

  useEffect(() => {
    if (query) {
      const filtered = mockData.activities.filter((data) => data.title.includes(query));
      setFilteredData(filtered);
    } else {
      setFilteredData(mockData.activities); // 쿼리 값이 없으면 전체 데이터를 표시
    }
  }, [query]);

  const slicedData = filteredData.slice(0, ITEMS_PER_PAGE[deviceType]);

  return (
    <div className="bg-gray01">
      <Banner />
      <div className="relative mx-auto max-w-[1200px] pb-[120px] pt-[93px] md:pt-[142px] xl:pt-[158px]">
        <SearchBar />
        {query ? "" : <BestActivities />}
        <div className="px-4 md:px-6 xl:px-0">
          {/* gap 조절 */}
          <div className={`mb-6 mt-10 flex justify-between gap-2 md:mb-[35px] md:mt-[60px] ${query ? "hidden" : ""}`}>
            <div className="flex gap-2 overflow-x-auto md:gap-[14px] xl:gap-6">
              {CATEGORY.map((category) => (
                <CategoryButton
                  key={category}
                  active={currentCategory === category}
                  onClick={() => setCurrentCategory(category)}
                >
                  {category}
                </CategoryButton>
              ))}
            </div>
            <div className="relative">
              <Dropdown label="가격" size={deviceType === "mobile" ? "small" : "medium"} options={OPTIONS} />
              <div className="absolute left-0 top-1/2 h-[51px] w-[40px] -translate-x-full -translate-y-1/2 bg-gradient-to-r from-gray01/0 via-gray01 to-gray01 md:h-[58px] md:w-[60px]"></div>
            </div>
          </div>

          <AllActivities filteredData={slicedData} currentCategory={currentCategory} query={query} />

          <Pagination totalCount={mockData.totalCount} itemsPerPage={4} />
        </div>
      </div>
    </div>
  );
};

export default Home;
