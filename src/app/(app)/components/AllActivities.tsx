"use client";

import Pagination from "@/components/Pagination";
import useDeviceType from "@/hooks/useDeviceType";
import usePaginationStore from "@/store/usePaginationStore";
import getJosa from "@/utils/getJosa";
import { useEffect, useState } from "react";
import AllActivityList from "./AllActivityList";
import Categories from "./Categories";

const ITEMS_PER_PAGE = {
  mobile: 4,
  tablet: 9,
  desktop: 8,
};

interface AllactivitiesProps {
  keyword?: string;
}

const AllActivities = ({ keyword }: AllactivitiesProps) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("latest");
  const [category, setCategory] = useState("");
  const deviceType = useDeviceType();
  const { totalCount } = usePaginationStore();

  useEffect(() => {
    if (category !== "" && sort !== "latest") setSort("latest");
    setPage(1);
  }, [category]);

  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [sort, deviceType]);

  useEffect(() => {
    if (category !== "") setCategory("");
    if (sort !== "latest") setSort("latest");
    if (page !== 1) setPage(1);
  }, [keyword]);

  return (
    <div className="px-4 md:px-6 xl:px-0">
      {keyword ? "" : <Categories sort={sort} setSort={setSort} category={category} setCategory={setCategory} />}

      <div className="mb-[38px] flex flex-col gap-6 text-black03 md:mb-[72px] md:gap-8 xl:mb-16">
        {keyword ? (
          <div className="flex flex-col gap-3">
            <p className="text-2xl leading-[28.64px] text-black02 md:text-[32px] md:leading-[38.19px]">
              <span className="font-bold">{keyword}</span>
              {getJosa(keyword)} 검색한 결과입니다.
            </p>
            <p className="leading-[26px]">총 {totalCount}개의 결과</p>
          </div>
        ) : (
          <p className="text-lg font-bold leading-[21.48px] text-black03 md:text-4xl md:leading-[42.96px]">
            {category ? category : "🛶 모든 체험"}
          </p>
        )}

        <AllActivityList
          keyword={keyword}
          sort={sort}
          category={category}
          page={page}
          size={ITEMS_PER_PAGE[deviceType]}
        />
      </div>

      <Pagination
        totalCount={totalCount}
        itemsPerPage={ITEMS_PER_PAGE[deviceType]}
        currentPage={page}
        setCurrentPage={setPage}
      />
    </div>
  );
};

export default AllActivities;
