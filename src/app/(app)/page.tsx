import Banner from "@/components/main/Banner";
import SearchBar from "@/components/main/SearchBar";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="relative bg-gray01 px-4 pb-[120px] pt-[93px]">
        <SearchBar />

        <div>
          <h2>🔥 인기 체험</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
