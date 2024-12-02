import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AllActivities from "./AllActivities";
import Banner from "./Banner";
import BestActivities from "./BestActivities";
import Categories from "./Categories";
import SearchBar from "./SearchBar";

const MainPage = () => {
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();

  useEffect(() => {
    // 쿼리 매개변수 'query'에 접근
    const queryValue = searchParams.get("query");
    if (queryValue) {
      setQuery(queryValue); // 쿼리 값이 있으면 상태를 업데이트
    } else {
      setQuery(undefined); // 쿼리 값이 없으면 기본 상태로 초기화
    }
  }, [searchParams]);

  return (
    <div className="bg-gray01">
      <Banner />
      <div className="relative mx-auto max-w-[1200px] pb-[120px] pt-[93px] md:pt-[142px] xl:pt-[158px]">
        <SearchBar />
        {query ? "" : <BestActivities />}
        <div className="px-4 md:px-6 xl:px-0">
          {/* gap 조절 */}
          <Categories category={category} setCategory={setCategory} query={query} />
          <AllActivities category={category} keyword={query} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
