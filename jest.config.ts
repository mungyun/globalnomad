/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from "jest";
import nextJest from "next/jest";

// next.config.js와 .env 파일을 로드할 경로를 제공하는 설정
const createJestConfig = nextJest({
  dir: "./", // 프로젝트의 루트 디렉토리
});

const config: Config = {
  // 테스트 전후로 모든 mock 호출, 인스턴스, 컨텍스트 및 결과를 자동으로 지웁니다.
  clearMocks: true,

  // 모듈에서 사용하는 파일 확장자의 배열
  moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "ts", "tsx", "json", "node"],

  // Jest 설정에 사용할 프리셋
  preset: "ts-jest", // TypeScript 지원을 위한 ts-jest 사용

  // 테스트 환경 설정
  testEnvironment: "jsdom", // Next.js는 jsdom을 사용하여 브라우저 환경을 시뮬레이션

  // 경로 별칭을 Jest가 인식하도록 설정
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // `@` 별칭을 `src` 폴더로 매핑
  },
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
};

export default createJestConfig(config);
