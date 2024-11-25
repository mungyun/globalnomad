module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier", // prettier와 ESLint의 충돌 방지
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error", // Prettier 규칙을 ESLint에서 에러로 처리
  },
};
