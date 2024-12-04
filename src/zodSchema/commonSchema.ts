import { z } from "zod";

// 이메일 스키마
export const EmailSchema = z.string().email("이메일 형식으로 작성해 주세요.");

// 비밀번호 정규 표현식 (regex)

// 비밀번호 스키마
export const PasswordSchema = z
  .string()
  .min(8, "비밀번호는 8자 이상이어야 합니다.")
  .max(32, "비밀번호는 최대 32자까지 가능합니다.");

// 닉네임 정규 표현식 (regex)
const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;

// 닉네임 스키마
export const NicknameSchema = z
  .string()
  .min(2, "닉네임은 2자 이상 입력해 주세요.")
  .max(10, "닉네임은 10자 이하로 입력해 주세요.")
  .regex(nicknameRegex, "닉네임은 영문, 한글, 숫자만 입력 가능하며, 특수문자와 공백은 포함할 수 없습니다.");

// 개발 환경: 간소화된 비밀번호 정규식 (regex)
const simplifyPasswordRegex = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/;

// 개발 환경: 간소화된 비밀번호 스키마
export const SimplifyPasswordSchema = z
  .string()
  .min(8, "비밀번호는 8자 이상이어야 합니다.")
  .max(32, "비밀번호는 최대 32자까지 가능합니다.")
  .regex(simplifyPasswordRegex, "허용되지 않는 문자가 포함되어 있습니다.");
