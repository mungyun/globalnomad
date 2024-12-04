"use client";

import AuthInput from "@/components/input/AuthInput";
import { Signup, SignupSchema } from "@/zodSchema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const mockData = {
  id: 0,
  email: "asd@naver.com",
  nickname: "정만철",
  profileImageUrl: "/images/1.png",
  createdAt: "2024-11-28T14:25:54.213Z",
  updatedAt: "2024-11-28T14:25:54.213Z",
};

type InputField = {
  label: string;
  name: keyof Signup;
  type: string;
  placeholder: string;
  readOnly?: boolean;
};

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
    readOnly: true,
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
    mode: "onBlur",
    defaultValues: {
      nickname: mockData.nickname,
      email: mockData.email,
    },
  });

  const onSubmit = (data: Signup) => {
    alert(JSON.stringify(data));
  };

  return (
    <section className="flex h-screen w-full max-w-[800px] flex-col">
      <header className="mb-2 flex justify-between">
        <h2 className="text-[32px] font-bold"> 내 정보</h2>
        <button
          className="flex h-[48px] w-[120px] items-center justify-center rounded bg-black02 font-semibold text-white"
          aria-label="체험 등록하기"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          저장하기
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
            readOnly={field.readOnly}
          />
        ))}
      </form>
    </section>
  );
};

export default UpdateProfile;
