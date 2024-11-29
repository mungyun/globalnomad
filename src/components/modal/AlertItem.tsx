import { Notification } from "@/types/MyNotificationsType";
import getTimeAgo from "@/utils/getTimeAgo";
import Image from "next/image";

const AlertItem = ({ item }: { item: Notification }) => {
  const { id, content, createdAt } = item;

  // "승인" 또는 "거절"에 따른 스타일 적용
  const isApproved = content.includes("승인");
  const isRejected = content.includes("거절");

  // "승인" 또는 "거절"을 찾아서 스타일을 적용하는 함수
  const highlightedContent = content
    .replace(/승인/g, '<span class="text-blue03">승인</span>')
    .replace(/거절/g, '<span class="text-red03">거절</span>');

  // 삭제 API 연결 예정
  const handleDelete = () => {
    console.log(id);
  };

  return (
    <li className="h-[126px] w-full rounded-[5px] border border-gray04 bg-white px-3 py-4">
      <div className="flex justify-between">
        <span
          className={`h-[5px] w-[5px] rounded-full ${isApproved ? "bg-blue03" : isRejected ? "bg-red03" : "bg-gray08"}`}
        ></span>
        <Image
          onClick={handleDelete}
          className="cursor-pointer"
          src="icons/X_gray.svg"
          alt="알림 삭제"
          width={24}
          height={24}
        />
      </div>
      <p
        className="text-[14px] text-black03"
        dangerouslySetInnerHTML={{ __html: highlightedContent }} // HTML을 삽입하여 스타일 적용
      />
      <p className="text-[12px] text-gray-500">{getTimeAgo(createdAt)}</p>
    </li>
  );
};

export default AlertItem;
