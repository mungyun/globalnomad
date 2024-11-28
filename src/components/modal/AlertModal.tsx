import { Notification } from "@/types/MyNotificationsType";
import getTimeAgo from "@/utils/getTimeAgo";
import Image from "next/image";
import React from "react";
import { AlertMockData } from "../layout/MockData";

const AlertItem = ({ item }: { item: Notification }) => {
  return (
    <li className="h-[126px] w-[328px] rounded-[5px] border border-gray04 bg-white px-3 py-4">
      <div className="flex justify-between">
        <span className="h-[5px] w-[5px] rounded-full bg-blue03"></span>
        <Image src="icons/X_gray.svg" alt="알림 삭제" width={24} height={24} />
      </div>
      <p className="text-[14px] text-black03">{item.content}</p>
      <p className="text-[12px] text-gray-500">{getTimeAgo(item.createdAt)}</p>
    </li>
  );
};

const AlertModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { totalCount, notifications } = AlertMockData;

  if (!isOpen) return null;
  console.log(notifications);

  return (
    <div className="absolute right-0 top-[57px] z-10 rounded-[10px] bg-green01 px-5 py-6 shadow-md md:h-[356px] md:w-[368px]">
      <div className="mb-4 flex justify-between">
        <h2 className="text-[20px] font-bold text-black03">알림 {totalCount}개</h2>
        <Image className="cursor-pointer" onClick={onClose} src="/icons/X.svg" alt="모달 닫기" width={24} height={24} />
      </div>
      <ul className="flex h-[260px] flex-col gap-2 overflow-auto overflow-y-auto">
        {notifications.map((item) => (
          <AlertItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default AlertModal;
