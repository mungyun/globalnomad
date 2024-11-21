"use client";

import { useState } from "react";

interface PaginationProps {
  totalCount: number;
  itemsPerPage?: number; // 페이지당 아이템 개수
}

const buttonStyle =
  "flex md:h-[55px] md:w-[55px] h-[40px] w-[40px] items-center justify-center rounded-[15px] text-[18px] font-medium border border border-green02";

const Pagination = ({ totalCount, itemsPerPage = 5 }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalCount / itemsPerPage); // 전체 페이지 수

  // 현재 페이지 그룹 계산
  const currentGroup = Math.ceil(currentPage / itemsPerPage);
  const startPage = (currentGroup - 1) * itemsPerPage + 1;
  const endPage = Math.min(startPage + itemsPerPage - 1, totalPages);

  // "이전" 클릭 핸들러
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // "다음" 클릭 핸들러
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // 특정 페이지 클릭 핸들러
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="pagination flex items-center justify-center gap-[10px]">
        {/* 이전 버튼 */}
        <button
          className={`rounded bg-white ${buttonStyle} ${
            currentPage === 1 ? "cursor-not-allowed border-gray03 opacity-50" : "hover:bg-gray02"
          }`}
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        {/* 동적으로 페이지 번호 출력 */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <button
            key={page}
            className={`${buttonStyle} ${currentPage === page ? "bg-green02 text-white" : "bg-white hover:bg-gray02"}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}

        {/* 다음 버튼 */}
        <button
          className={`bg-white ${buttonStyle} ${
            currentPage === totalPages ? "cursor-not-allowed border-gray03 opacity-50" : "hover:bg-gray02"
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </>
  );
};

export default Pagination;
