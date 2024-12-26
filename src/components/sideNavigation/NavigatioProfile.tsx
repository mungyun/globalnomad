"use client";

import { PostProfileImage, getUsersProfile } from "@/lib/api/MyPage";
import useUserImageStore from "@/store/useUserImageStore";
import { User } from "@/types/MyPageType";
import { Message } from "@/utils/toastMessage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function NavigationProfile() {
  const pathname = usePathname();

  // 유저 프로필 이미지 전역관리
  const { currentUserImage, updateUserImage, setCurrentUserImage, setUpdateUserImage } = useUserImageStore();

  // 내 정보 조회
  const { data, error, isError } = useQuery<User, Error>({
    queryKey: ["userProfile"],
    queryFn: getUsersProfile,
  });
  if (isError) {
    toast.error(error.message);
  }
  useEffect(() => {
    if (data) {
      setCurrentUserImage(data?.profileImageUrl); // 현재 프로필 이미지 업데이트
    }
  }, [data]);

  const profileUpdateMutation = useMutation({
    mutationFn: (file: File) => PostProfileImage(file),
    onSuccess: (data) => {
      setCurrentUserImage(data.profileImageUrl);
      setUpdateUserImage(data.profileImageUrl);
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error(Message.error);
      }
    },
  });

  // 프로필 이미지 변경 함수
  const handleChangeUserImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error(Message.uploadImageError);
      return;
    }

    await profileUpdateMutation.mutateAsync(file);
  };

  return (
    <div className="hidden md:block">
      <div className="relative m-auto flex h-[160px] w-[160px] items-center justify-center overflow-hidden rounded-full bg-gray03">
        {currentUserImage === null ? (
          <IoPersonCircleOutline className="h-full w-full scale-[1.3] text-gray07" />
        ) : (
          <Image
            src={updateUserImage || currentUserImage} // 프로필 업데이트가 있으면 updateUserImage 없으면 currentUserImage
            alt="프로필 이미지"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        )}
      </div>

      {pathname === "/my" ? (
        <label className="md absolute left-[195px] top-[145px] h-[44px] w-[44px] cursor-pointer md:left-[150px] xl:left-[215px]">
          <input type="file" className="hidden" onChange={handleChangeUserImg} />
          <Image src="/icons/edit.svg" alt="이미지 수정" fill />
        </label>
      ) : null}
    </div>
  );
}
