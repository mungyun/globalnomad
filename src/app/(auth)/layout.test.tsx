import { render, screen } from "@testing-library/react";
import AuthLayout from "./layout";

describe("AuthLayout", () => {
  it("로고가 렌더링되고, children이 올바르게 전달되는지 확인", () => {
    render(
      <AuthLayout>
        <div data-testid="child-element">테스트 자식 요소</div>
      </AuthLayout>
    );

    // 로고 이미지가 렌더링되는지 확인
    const logo = screen.getByAltText("로고 이미지");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/icons/logo_big.svg");

    // Link 컴포넌트가 렌더링되었는지 확인
    const link = screen.getByRole("link", { name: "로고 이미지" });
    expect(link).toBeInTheDocument();

    // children이 올바르게 전달되는지 확인
    const childElement = screen.getByTestId("child-element");
    expect(childElement).toBeInTheDocument();
    expect(childElement.textContent).toBe("테스트 자식 요소");
  });
});
