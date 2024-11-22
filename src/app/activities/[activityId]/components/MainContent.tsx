import KakaoMap from "./KakaoMap";
import SideBar from "./SideBar";
import { mockData } from "./mockdata";

const MainContent = () => {
  const { description, address } = mockData;
  return (
    <div className="flex gap-6">
      <div>
        <div className="border-y border-y-gray08 xl:w-[790px]">
          <div className="border-b border-b-gray08 xl:pb-[34px] xl:pt-10">
            <h3 className="mb-4 text-[20px] font-bold text-black02">체험 설명</h3>
            <p className="text-[16px] text-gray08">{description}</p>
          </div>
          <div className="xl:py-10">
            <KakaoMap address={address} />
          </div>
        </div>
      </div>
      <SideBar />
    </div>
  );
};

export default MainContent;
