import AllActivities from "./components/AllActivities";
import Banner from "./components/Banner";
import BestActivities from "./components/BestActivities";
import SearchBar from "./components/SearchBar";

interface QueryType {
  keyword?: string;
}

const Home = async ({ searchParams }: { searchParams: Promise<QueryType> }) => {
  const { keyword } = await searchParams;

  return (
    <div>
      <Banner />
      <div className="relative mx-auto max-w-[1200px] pb-[120px] pt-[93px] md:pt-[142px] xl:pt-[158px]">
        <SearchBar />
        {keyword ? "" : <BestActivities />}
        <AllActivities keyword={keyword} />
      </div>
    </div>
  );
};

export default Home;
