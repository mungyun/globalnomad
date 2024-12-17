import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "./lib/api/axiosInstanceApi";

interface DecodedPayload {
  id: number; // 사용자의 ID (숫자 타입)
  teamId: string; // 팀 ID (문자열 타입)
  iat: number; // 발급 시간 (초 단위로 표현된 숫자)
  exp: number; // 만료 시간 (초 단위로 표현된 숫자)
  iss: string; // 발급자 (문자열 타입)
}

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/")) {
    return await refreshToken(request);
  }

  return NextResponse.next();
};

const refreshToken = async (req: NextRequest) => {
  const AccessToken = req.cookies.get("accessToken")?.value;
  const RefreshToken = req.cookies.get("refreshToken")?.value;

  const res = NextResponse.next();

  const response = decodeToken(AccessToken);

  if (!response || isTokenExpired(response)) {
    // 리프레시 토큰을 이용해 새로운 액세스 토큰 발급
    const { accessToken, refreshToken } = await refreshAccessToken(RefreshToken || "");
    const access_token = {
      name: "accessToken",
      expires: Date.now() + 1 * 60 * 60 * 1000, // 1시간,
      httpOnly: true,
      value: accessToken,
    };
    const refresh_token = {
      name: "refreshToken",
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7일,
      httpOnly: true,
      value: refreshToken,
    };
    res.cookies.set(access_token);
    res.cookies.set(refresh_token);
  }

  return res;
};

// 리프레시 토큰을 요청해서 새로운 액세스 토큰을 받는 함수
const refreshAccessToken = async (refreshToken: string) => {
  if (!refreshToken) return null;
  try {
    const response = await axiosInstance.post(
      "/auth/tokens",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

// 디코딩된 토큰에서 유효 기간(exp) 확인
const decodeToken = (accessToken: string | undefined) => {
  if (!accessToken) {
    return null; // 토큰이 비어있음
  }

  // JWT를 '.'로 분리하여 페이로드를 가져옵니다.
  const parts = accessToken.split(".");
  if (parts.length !== 3) {
    return null; // 잘못된 형식의 토큰
  }

  // Base64Url로 인코딩된 페이로드를 디코드합니다.
  const payload = parts[1];
  const decodedPayload = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));

  return decodedPayload;
};

// 토큰이 만료되었는지 확인하는 함수
const isTokenExpired = (decodedPayload: DecodedPayload) => {
  const exp = decodedPayload?.exp; // exp는 토큰 만료 시간을 나타내는 값 (초 단위)

  if (!exp) {
    return true; // exp가 없다면 만료된 것으로 처리
  }

  const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)

  // 만약 현재 시간이 exp보다 크면 만료된 것으로 간주
  return currentTime > exp;
};
