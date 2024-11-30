import CommentList from "./CommentList";
import KakaoMap from "./KakaoMap";
import { mockData } from "./mockdata";

const MainContent = () => {
  const { description, address } = mockData;
  return (
    <div>
      <div className="w-full px-4 md:border-t md:border-t-gray08 md:p-6 xl:max-w-[790px] xl:p-0">
        <div className="border-b border-b-gray08 pb-4 md:pb-10 xl:pb-[34px] xl:pt-10">
          <h3 className="mb-4 text-[20px] font-bold text-black02">체험 설명</h3>
          <p className="text-[16px] text-gray08">{description}</p>
        </div>
        <div className="z-0 pt-4 md:border-b md:border-b-gray08 md:py-10">
          <KakaoMap address={address} />
        </div>
        <CommentList />
      </div>
    </div>
  );
};

export default MainContent;
