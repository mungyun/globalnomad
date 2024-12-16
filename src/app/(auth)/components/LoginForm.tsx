"use client";

import { useToast } from "@/components/toast/ToastProvider";
import { postLogin } from "@/lib/api/Auth";
import useAuthStore from "@/store/useAuthStore";
import { Message } from "@/utils/toastMessage";
import { Login, LoginSchema } from "@/zodSchema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../components/Button";
import AuthInput from "../../../components/input/AuthInput";

const LoginForm = () => {
  const router = useRouter();
  const Toast = useToast();
  const { user, setUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  // 로그인 상태라면 메인 화면으로 리다이렉트
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const onSubmit: SubmitHandler<Login> = async (data) => {
    try {
      const res = await postLogin(data); // 로그인 요청
      if (res.user) {
        setUser(res.user);
      }
      Toast.success(Message.loginSuccess);
      router.push("/"); // 로그인 성공 시 로그인 페이지로 리다이렉트
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        // AxiosError인 경우
        Toast.error(error.response?.data?.message || Message.loginError);
      } else {
        // 다른 오류가 발생한 경우
        Toast.error(Message.error);
      }
    } finally {
      reset();
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
        label="비밀번호"
        type="password"
        {...register("password")}
        errors={errors.password?.message}
        placeholder="비밀번호를 입력해 주세요"
      />
      <Button type="submit" disabled={isSubmitting || !isValid}>
        로그인 하기
      </Button>
    </form>
  );
};

export default LoginForm;
