import { isAxiosError } from "axios";
import { proxy } from "./axiosInstanceApi";

export const postLogin = async ({ email, password }: { email: string; password: string }) => {
  try {
    const res = await proxy.post("/auth/login", { email, password });  // 경로 수정
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error("이메일 형식으로 작성해주세요.");
      }

      if (error.response?.status === 404) {
        throw new Error("존재하지 않는 유저입니다.");
      }
    }
    console.error("에러 메시지: ", error instanceof Error ? error.message : error);
    throw new Error("서버 오류가 발생했습니다.");  // return 대신 throw
  }
};
