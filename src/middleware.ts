import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "./lib/api/axiosInstanceApi";

// 디코딩된 JWT 토큰의 구조 정의
interface DecodedPayload {
  id: number; // 사용자의 ID
  teamId: string; // 팀 ID
  iat: number; // 토큰 발급 시간 (초 단위)
  exp: number; // 토큰 만료 시간 (초 단위)
  iss: string; // 발급자
}

// 미들웨어 함수 - 모든 요청에 대해 실행
export const middleware = async (request: NextRequest): Promise<NextResponse> => {
  const { pathname } = request.nextUrl;

  // 특정 경로에 대해 토큰 갱신 로직을 실행
  if (pathname.startsWith("/")) {
    return refreshToken(request);
  }

  // 기본적으로 요청을 통과시킴
  return NextResponse.next();
};

// 토큰 갱신 함수
const refreshToken = async (req: NextRequest): Promise<NextResponse> => {
  const accessToken = req.cookies.get("accessToken")?.value; // 액세스 토큰 가져오기
  const refreshToken = req.cookies.get("refreshToken")?.value; // 리프레시 토큰 가져오기

  const res = NextResponse.next(); // 기본 응답 생성
  const decodedToken = decodeToken(accessToken); // 액세스 토큰 디코드

  // 토큰이 없거나 만료된 경우
  if (!decodedToken || isTokenExpired(decodedToken)) {
    try {
      // 리프레시 토큰이 없으면 로그인 페이지로 리다이렉트
      if (!refreshToken) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // 리프레시 토큰으로 새로운 토큰 요청
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshAccessToken(refreshToken);

      // 새로운 토큰을 쿠키에 저장
      res.cookies.set({
        name: "accessToken",
        value: newAccessToken,
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1시간 후 만료
      });

      res.cookies.set({
        name: "refreshToken",
        value: newRefreshToken,
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7일 후 만료
      });
    } catch (error: unknown) {
      // 리프레시 토큰이 유효하지 않은 경우 로그인 페이지로 리다이렉트
      if (isAxiosError(error) && error.response?.status === 401) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      // 기타 에러 발생 시 홈으로 리다이렉트
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return res; // 요청을 계속 진행
};

// 리프레시 토큰을 이용해 새로운 액세스 토큰 요청
const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axiosInstance.post(
      "/auth/tokens", // 토큰 재발급 API
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`, // 리프레시 토큰을 인증 헤더에 추가
        },
      }
    );

    // 응답에 토큰 데이터가 없으면 에러 발생
    if (!response.data || !response.data.accessToken || !response.data.refreshToken) {
      throw new Error("토큰 재발급 중 오류가 발생했습니다.");
    }

    return response.data; // 새 액세스 토큰과 리프레시 토큰 반환
  } catch (error) {
    // Axios 에러라면 다시 던져서 처리
    if (isAxiosError(error)) {
      throw error;
    }
  }
};

// JWT 토큰 디코딩 함수
const decodeToken = (accessToken: string | undefined) => {
  if (!accessToken) return null; // 토큰이 없으면 null 반환

  const parts = accessToken.split("."); // 토큰을 '.' 기준으로 분리
  if (parts.length !== 3) return null; // 잘못된 형식의 토큰 처리

  const payload = parts[1]; // 페이로드 부분 가져오기
  return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")); // Base64Url 디코드 후 JSON 파싱
};

// 토큰 만료 여부 확인 함수
const isTokenExpired = (decodedPayload: DecodedPayload) => {
  const exp = decodedPayload?.exp; // 만료 시간 가져오기
  if (!exp) return true; // 만료 시간이 없으면 만료된 것으로 처리

  const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
  return currentTime > exp; // 현재 시간이 만료 시간보다 크면 만료된 것으로 간주
};
