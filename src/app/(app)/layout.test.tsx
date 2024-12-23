import { render, screen } from "@testing-library/react";
import Layout from "./layout";

jest.mock("@/components/layout/Header", () => () => <div data-testid="header">Header</div>);
jest.mock("@/components/layout/Footer", () => () => <div data-testid="footer">Footer</div>);

describe("Layout Component", () => {
  it("Header, Footer, 그리고 children을 렌더링한다", () => {
    // Arrange: 테스트에 사용할 자식 요소
    const childrenContent = "테스트 자식 콘텐츠";

    // Act: Layout 컴포넌트 렌더링
    render(
      <Layout>
        <div>{childrenContent}</div>
      </Layout>
    );

    // Assert: Header, Footer, 그리고 children이 올바르게 렌더링되었는지 확인
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByText(childrenContent)).toBeInTheDocument();
  });
});
