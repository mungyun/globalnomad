import useDeviceType from "@/hooks/useDeviceType";
import { deleteMyNotification, getMyNotifications } from "@/lib/api/MyNotifications";
import { AlertData } from "@/types/MyNotificationsType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useToast } from "../toast/ToastProvider";
import AlertItem from "./AlertItem";

const AlertModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const Toast = useToast();
  const {
    data: alertData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["myNotifications", { size: 10, cursorId: undefined }],
    queryFn: getMyNotifications,
    staleTime: 1000 * 60,
    enabled: isOpen,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (notificationId: number) => {
      await deleteMyNotification({ notificationId });
    },
    onMutate: async (notificationId: number) => {
      const previousData = queryClient.getQueryData<AlertData>(["myNotifications"]);

      queryClient.setQueryData(["myNotifications"], (oldData: AlertData | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          notifications: oldData.notifications.filter((item) => item.id !== notificationId),
          totalCount: oldData.totalCount - 1,
        };
      });

      return { previousData };
    },
    onError: (error, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["myNotifications"], context.previousData);
      }
      Toast.error(error?.message || "삭제에 실패했습니다.");
    },
    onSuccess: () => {
      Toast.success("알림을 삭제했습니다.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myNotifications"] });
    },
  });

  const deviceType = useDeviceType();

  useEffect(() => {
    if (deviceType === "mobile" && isOpen) {
      document.body.style.overflow = "hidden"; // 모바일에서 모달이 열리면 스크롤을 막음
    }
    return () => {
      document.body.style.overflow = ""; // 모달이 닫히면 스크롤을 복원
    };
  }, [deviceType, isOpen]);

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div
        className={`z-[9999] bg-green01 px-5 py-6 shadow-md ${
          deviceType === "mobile"
            ? "fixed left-0 top-0 h-screen w-screen"
            : "absolute top-[57px] h-[356px] rounded-[10px] md:right-0 md:w-[368px]"
        }`}
      >
        <Skeleton height={126} width={328} />
        <Skeleton height={126} width={328} />
      </div>
    );
  }

  if (isError || !alertData) {
    return (
      <div className="z-[9999] bg-green01 px-5 py-6 shadow-md">
        <p>알림 데이터를 불러오는 데 실패했습니다.</p>
      </div>
    );
  }

  const { totalCount, notifications }: AlertData = alertData;

  return (
    <div
      className={`z-[9999] bg-green01 px-5 py-6 shadow-md ${
        deviceType === "mobile"
          ? "fixed left-0 top-0 h-screen w-screen"
          : "absolute top-[57px] h-[356px] rounded-[10px] md:right-0 md:w-[368px]"
      }`}
    >
      <div className="mb-4 flex justify-between">
        <h2 className="text-[20px] font-bold text-black03">알림 {totalCount}개</h2>
        <Image className="cursor-pointer" onClick={onClose} src="/icons/X.svg" alt="모달 닫기" width={24} height={24} />
      </div>
      <ul className="flex h-full flex-col gap-2 overflow-y-auto md:h-[260px]">
        {notifications.map((item) => (
          <AlertItem key={item.id} item={item} onDelete={(id) => mutation.mutate(id)} />
        ))}
      </ul>
    </div>
  );
};

export default AlertModal;
