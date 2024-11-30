"use client";

import Button from "@/components/Button";
import AuthInput from "@/components/input/AuthInput";
import { postSignUp } from "@/lib/api/Users";
import { Signup, SignupSchema } from "@/zodSchema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
    mode: "onBlur",
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit: SubmitHandler<Signup> = async ({ confirmPassword, ...submitData }) => {
    try {
      await postSignUp(submitData); // 회원가입 요청
      router.push("/login"); // 회원가입 성공 시 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error("회원가입 중 오류 발생", error);
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
        type="string"
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
