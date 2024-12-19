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
    const facebookIcon = screen.getByAltText("페이스북 아이콘");
    const twitterIcon = screen.getByAltText("트위터 아이콘");
    const youtubeIcon = screen.getByAltText("유튜브 아이콘");
    const instagramIcon = screen.getByAltText("인스타그램 아이콘");

    expect(facebookIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
    expect(youtubeIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();

    // 이미지의 src 속성이 올바르게 설정되었는지 확인
    expect(facebookIcon).toHaveAttribute("src", "/icons/facebook.svg");
    expect(twitterIcon).toHaveAttribute("src", "/icons/twitter.svg");
    expect(youtubeIcon).toHaveAttribute("src", "/icons/youtube.svg");
    expect(instagramIcon).toHaveAttribute("src", "/icons/instagram.svg");
  });
});
