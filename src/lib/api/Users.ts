import { isAxiosError } from "axios";
import { proxy } from "./axiosInstanceApi";

export const postSignUp = async ({
  email,
  nickname,
  password,
}: {
  email: string;
  nickname: string;
  password: string;
}) => {
  try {
    const res = await proxy.post("/api/users", { email, nickname, password });
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    }
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error("이메일 형식으로 작성해주세요.");
      }

      if (error.response?.status === 409) {
        throw new Error("중복된 이메일입니다.");
      }
    }
    // 기타 에러 처리
    console.error("에러 메시지: ", error instanceof Error ? error.message : error);
    return { message: "서버 오류가 발생했습니다.", status: 500 };
  }
};
