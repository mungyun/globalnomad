import { z } from "zod";
import { EmailSchema, NicknameSchema, PasswordSchema } from "./commonSchema";

export const SignupSchema = z
  .object({
    email: EmailSchema,
    nickname: NicknameSchema,
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type Signup = z.infer<typeof SignupSchema>;
