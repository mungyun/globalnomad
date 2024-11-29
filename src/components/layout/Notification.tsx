"use client";

import Image from "next/image";
import React, { useState } from "react";
import AlertModal from "../modal/AlertModal";

const Notification = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className="relative size-5">
      <Image
        className="cursor-pointer"
        onClick={() => setIsModalOpen((prev) => !prev)}
        src="/icons/Icon_notification.svg"
        alt="알림 아이콘"
        fill
      />
      <AlertModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Notification;
