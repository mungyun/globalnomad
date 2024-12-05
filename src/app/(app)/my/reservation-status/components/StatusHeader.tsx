import { proxy } from "@/lib/api/axiosInstanceApi";
import StatusDropdown from "./StatusDropdown";

const StatusHeader = async () => {
  try {
    const response = await proxy.get("/api/my-activities");

    // 서버에서 응답 데이터를 처리
    const activityTitles = response.data.map((activity: { title: string }) => activity.title);

    return (
      <div className="mb-[30px]">
        <h2 className="mb-6 text-[32px] font-bold md:mb-8">예약현황</h2>
        <StatusDropdown datas={activityTitles} type="header" />
      </div>
    );
  } catch (error) {
    console.error("데이터를 가져오는 데 실패했습니다.", error);

    // 오류 처리 UI
    return (
      <div className="mb-[30px]">
        <h2 className="mb-6 text-[32px] font-bold md:mb-8">예약현황</h2>
        <div>데이터를 가져오는 데 실패했습니다.</div>
      </div>
    );
  }
};

export default StatusHeader;
