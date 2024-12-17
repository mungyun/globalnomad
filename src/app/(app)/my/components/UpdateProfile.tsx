"use client";

import AuthInput from "@/components/input/AuthInput";
import { useToast } from "@/components/toast/ToastProvider";
import { getUsersProfile, updateUserProfile } from "@/lib/api/MyPage";
import useAuthStore from "@/store/useAuthStore";
import useUserImageStore from "@/store/useUserImageStore";
import { InputField, ProfileUpdateData, User } from "@/types/MyPageType";
import { Signup, SignupSchema } from "@/zodSchema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";

const INPUT_FIELDS: InputField[] = [
  {
    label: "닉네임",
    name: "nickname",
    type: "text",
    placeholder: "닉네임을 입력해 주세요",
  },
  {
    label: "이메일",
    name: "email",
    type: "email",
    placeholder: "이메일을 입력해 주세요",
    disabled: true,
  },
  {
    label: "비밀번호",
    name: "password",
    type: "password",
    placeholder: "8자 이상 입력해 주세요",
  },
  {
    label: "비밀번호 확인",
    name: "confirmPassword",
    type: "password",
    placeholder: "비밀번호를 한번 더 입력해 주세요",
  },
];

const UpdateProfile = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { user, setUser } = useAuthStore();
  const serverUserImg = user?.profileImageUrl ?? "";
  const { updateUserImage } = useUserImageStore();

  // 내 정보 조회 쿼리
  const {
    data: userProfile,
    error,
    isError,
  } = useQuery<User, Error>({
    queryKey: ["myPage"],
    queryFn: getUsersProfile,
    retry: 1,
  });
  if (isError) {
    toast.error(error.message);
  }
  // 내 정보 수정 뮤테이션
  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPage"] });
      toast.success("내 정보 수정 완료!");
      reset((current) => ({
        ...current,
        password: "",
        confirmPassword: "",
      }));
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "내 정보 수정을 실패했습니다.");
      } else {
        toast.error("내 정보 수정을 실패했습니다.");
      }
    },
  });

  // 제출 함수
  const handleProfileUpdate = async (data: Signup) => {
    const updateData: ProfileUpdateData = {
      nickname: data.nickname,
      profileImageUrl: updateUserImage || serverUserImg,
      newPassword: data.password,
    };
    await mutation.mutateAsync(updateData);

    if (user) {
      setUser({
        ...user,
        nickname: updateData.nickname,
        profileImageUrl: updateData.profileImageUrl,
      });
    }
  };

  // 리액트 hookForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
    mode: "onBlur",
    values: userProfile && {
      nickname: userProfile.nickname,
      email: userProfile.email,
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <section className="flex h-screen w-full max-w-[800px] flex-col">
      <header className="mb-3 flex justify-between">
        <h2 className="text-[32px] font-bold"> 내 정보</h2>
        <button
          className="flex h-[48px] w-[120px] items-center justify-center rounded bg-black02 font-semibold text-white"
          type="button"
          aria-label="체험 등록하기"
          onClick={handleSubmit(handleProfileUpdate)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "저장 중..." : "저장하기"}
        </button>
      </header>
      <form className="flex flex-col gap-4">
        {INPUT_FIELDS.map((field) => (
          <AuthInput
            key={field.name}
            label={field.label}
            type={field.type}
            {...register(field.name)}
            errors={errors[field.name]?.message}
            placeholder={field.placeholder}
            labelStyle="large"
            disabled={field.disabled}
          />
        ))}
      </form>
    </section>
  );
};

export default UpdateProfile;
