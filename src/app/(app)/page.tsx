import AllActivities from "./components/AllActivities";
import Banner from "./components/Banner";
import BestActivities from "./components/BestActivities";
import Categories from "./components/Categories";
import SearchBar from "./components/SearchBar";

interface QueryType {
  keyword?: string;
  category?: string;
  sort?: string;
  page?: number;
  size?: number;
}

const Home = async ({ searchParams }: { searchParams: Promise<QueryType> }) => {
  const { keyword, category, sort } = await searchParams;

  return (
    <div className="bg-gray01">
      <Banner />
      <div className="relative mx-auto max-w-[1200px] pb-[120px] pt-[93px] md:pt-[142px] xl:pt-[158px]">
        <SearchBar />
        {keyword ? "" : <BestActivities />}
        <div className="px-4 md:px-6 xl:px-0">
          {/* gap 조절 필요*/}
          {keyword ? "" : <Categories currentCategory={category} />}
          <AllActivities category={category} keyword={keyword} sort={sort} />
        </div>
      </div>
    </div>
  );
};

export default Home;
