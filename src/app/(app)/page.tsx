import { Metadata } from "next";
import AllActivities from "./components/AllActivities";
import Banner from "./components/Banner";
import BestActivities from "./components/BestActivities";
import SearchBar from "./components/SearchBar";

interface QueryType {
  keyword?: string;
}

export const metadata: Metadata = {
  title: "GlobalNomad - 다양한 체험을 예약하세요!",
  description:
    "GlobalNomad에서 사용자가 판매자와 체험자 역할을 모두 할 수 있습니다. 다양한 체험을 통해 새로운 경험을 만나보세요!",
  keywords: "체험, 예약, 여행, GlobalNomad, 판매자, 체험자",
  openGraph: {
    title: "GlobalNomad - 다양한 체험을 예약하세요!",
    description:
      "GlobalNomad에서 사용자가 판매자와 체험자 역할을 모두 할 수 있습니다. 다양한 체험을 통해 새로운 경험을 만나보세요!",
    images: ["/thumbnail.png"],
    type: "website",
  },
};

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
