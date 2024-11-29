import { proxy } from "./axiosInstanceApi";

export const postLogin = async ({ email, password }: { email: string; password: string }) => {
  try {
    const res = await proxy.post("/api/auth/login", { email, password });
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};
