import { isAxiosError } from "axios";
import { proxy } from "./axiosInstanceApi";

// 로그인
export const postLogin = async ({ email, password }: { email: string; password: string }) => {
  try {
    const res = await proxy.post("/api/auth/login", { email, password });
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }

    throw error;
  }
};
