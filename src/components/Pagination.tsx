"use client";

interface PaginationProps {
  totalCount: number; // 전체 아이템 수
  itemsPerPage?: number; // 페이지당 표시할 아이템 개수 (기본값: 10)
  pageSize?: number; // 페이지네이션에 표시할 페이지 번호 개수 (기본값: 5)
  currentPage: number; // 상위 컴포넌트에서 전달받은 현재 페이지
  setCurrentPage: (page: number) => void; // 상위 컴포넌트에서 전달받은 페이지 변경 함수
}

const buttonStyle =
  "flex md:h-[55px] md:w-[55px] h-[40px] w-[40px] items-center justify-center rounded-[15px] text-[18px] font-medium border border border-green02";

const Pagination = ({ totalCount, itemsPerPage = 10, pageSize = 5, currentPage, setCurrentPage }: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage); // 전체 페이지 수 계산

  // 현재 페이지 그룹 계산
  const currentGroup = Math.ceil(currentPage / pageSize);

  // 현재 그룹의 시작 페이지 번호 계산
  const startPage = Math.max(1, (currentGroup - 1) * pageSize + 1);

  // 현재 그룹의 마지막 페이지 번호 계산
  const endPage = Math.min(currentGroup * pageSize, totalPages);

  // "이전" 버튼 클릭 핸들러
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1); // 현재 페이지가 1보다 크면 페이지 감소
  };

  // "다음" 버튼 클릭 핸들러
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1); // 현재 페이지가 마지막 페이지보다 작으면 페이지 증가
  };

  // 특정 페이지 번호 클릭 핸들러
  const handlePageClick = (page: number) => {
    if (page !== currentPage) setCurrentPage(page); // 현재 페이지와 다른 경우에만 페이지 변경
  };

  return (
    <>
      {/* 페이지네이션 컨테이너 */}
      <div className="pagination flex items-center justify-center gap-[10px]">
        {/* 이전 버튼 */}
        <button
          className={`rounded bg-white ${buttonStyle} ${
            currentPage === 1 ? "cursor-not-allowed border-gray03 opacity-50" : "hover:bg-gray02"
          }`}
          onClick={handlePrev}
          disabled={currentPage === 1} // 첫 번째 페이지에서는 비활성화
        >
          {"<"}
        </button>

        {/* 현재 그룹의 페이지 번호 버튼 생성 */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <button
            key={page} // 각 버튼에 고유 키 설정
            className={`${buttonStyle} ${currentPage === page ? "bg-green02 text-white" : "bg-white hover:bg-gray02"}`}
            onClick={() => handlePageClick(page)} // 페이지 클릭 핸들러 연결
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
          disabled={currentPage === totalPages} // 마지막 페이지에서는 비활성화
        >
          {">"}
        </button>
      </div>
    </>
  );
};

export default Pagination;
