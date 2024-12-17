"use client";

import { PostProfileImage } from "@/lib/api/MyPage";
import useAuthStore from "@/store/useAuthStore";
import useUserImageStore from "@/store/useUserImageStore";
import { Message } from "@/utils/toastMessage";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IoPersonCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function NavigationProfile() {
  const pathname = usePathname();

  // 기존 프로필 설정
  const { user } = useAuthStore();
  const currentProfileImg = user?.profileImageUrl ?? "";

  // 새로운 프로필 설정
  const { updateUserImage, setUpdateUserImage } = useUserImageStore();

  const profileUpdateMutation = useMutation({
    mutationFn: (file: File) => PostProfileImage(file),
    onSuccess: (data) => {
      setUpdateUserImage(data.profileImageUrl);
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || Message.error);
      } else {
        toast.error(Message.error);
      }
    },
  });

  const handleChangeUserImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("JPG, PNG, GIF 형식의 이미지만 업로드 가능합니다.");
      return;
    }

    await profileUpdateMutation.mutateAsync(file);
  };

  return (
    <div className="hidden md:block">
      <div className="relative m-auto flex h-[160px] w-[160px] items-center justify-center overflow-hidden rounded-full bg-gray03">
        {currentProfileImg === "" ? (
          <IoPersonCircleOutline className="h-full w-full scale-[1.3] text-gray07" />
        ) : (
          <Image
            src={updateUserImage || currentProfileImg}
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
