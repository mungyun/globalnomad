import { proxy } from "./axiosInstanceApi";

export const postLogin = async ({ email, password }: { email: string; password: string }) => {
  try {
    const res = await proxy.post("/api/auth/login", { email, password });
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (error) {
    console.error("로그인 요청 중 문제가 발생했습니다.", error);
    throw new Error("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
  }
};
