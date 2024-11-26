import Banner from "@/components/main/Banner";
import BestActivities from "@/components/main/BestActivities";
import SearchBar from "@/components/main/SearchBar";
import { mockData } from "@/components/main/mockdata";

const Home = () => {
  const mockdata = mockData;
  return (
    <>
      <Banner />
      <div className="relative bg-gray01 px-4 pb-[120px] pt-[93px]">
        <SearchBar />
        <BestActivities bestActivities={mockdata.activities} />
      </div>
    </>
  );
};

export default Home;
