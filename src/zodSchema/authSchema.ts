import { z } from "zod";
import { EmailSchema, NicknameSchema, SimplifyPasswordSchema } from "./commonSchema";

// 개발의 편의성을 위해 비밀번호 규칙 간소화 -> 배포 시 수정 필요
export const LoginSchema = z.object({
  email: EmailSchema,
  // password: PasswordSchema,
  password: SimplifyPasswordSchema,
});

export type Login = z.infer<typeof LoginSchema>;

export const SignupSchema = z
  .object({
    email: EmailSchema,
    nickname: NicknameSchema,
    // password: PasswordSchema,
    password: SimplifyPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type Signup = z.infer<typeof SignupSchema>;
