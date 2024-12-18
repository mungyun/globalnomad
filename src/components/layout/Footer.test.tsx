import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("Footer가 제대로 렌더링 되는지 확인", () => {
    render(<Footer />);

    // ©codeit - 2023 텍스트 확인
    expect(screen.getByText("©codeit - 2023")).toBeInTheDocument();

    // Privacy Policy와 FAQ 링크가 렌더링되는지 확인
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();

    // 페이스북, 트위터, 유튜브, 인스타그램 아이콘이 렌더링되는지 확인
    expect(screen.getByAltText("페이스북 아이콘")).toBeInTheDocument();
    expect(screen.getByAltText("트위터 아이콘")).toBeInTheDocument();
    expect(screen.getByAltText("유튜브 아이콘")).toBeInTheDocument();
    expect(screen.getByAltText("인스타그램 아이콘")).toBeInTheDocument();
  });
});
