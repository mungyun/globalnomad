"use client";

import Button from "@/components/Button";
import AuthInput from "@/components/input/AuthInput";
import { useToast } from "@/components/toast/ToastProvider";
import { postSignUp } from "@/lib/api/Auth";
import useAuthStore from "@/store/useAuthStore";
import { Message } from "@/utils/toastMessage";
import { Signup, SignupSchema } from "@/zodSchema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const SignupForm = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const Toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
  });

  // 로그인 상태라면 메인 화면으로 리다이렉트
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit: SubmitHandler<Signup> = async ({ confirmPassword, ...submitData }) => {
    try {
      await postSignUp(submitData);
      Toast.success(Message.signupSuccess);
      router.push("/login");
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        Toast.error(error.response?.data.message);
      } else {
        Toast.error(Message.signupError);
      }
    } finally {
      reset(); // 폼 초기화
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-[640px] flex-col gap-7">
      <AuthInput
        label="이메일"
        type="email"
        {...register("email")}
        errors={errors.email?.message}
        placeholder="이메일을 입력해 주세요"
      />
      <AuthInput
        label="닉네임"
        type="text"
        {...register("nickname")}
        errors={errors.nickname?.message}
        placeholder="닉네임을 입력해 주세요"
      />
      <AuthInput
        label="비밀번호"
        type="password"
        {...register("password")}
        errors={errors.password?.message}
        placeholder="8자 이상 입력해 주세요"
      />
      <AuthInput
        label="비밀번호 확인"
        type="password"
        {...register("confirmPassword")}
        errors={errors.confirmPassword?.message}
        placeholder="비밀번호를 한번 더 입력해 주세요"
      />
      <Button type="submit" disabled={isSubmitting || !isValid}>
        회원가입 하기
      </Button>
    </form>
  );
};

export default SignupForm;
