"use client";

import { Login, LoginSchema } from "@/zodSchema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import AuthInput from "../input/AuthInput";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Login> = (data) => {
    console.log(data);
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
