import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("../../hooks/useRoleRedirect", () => ({
  default: vi.fn(),
}));

vi.mock("../../components/organisms/HeroSection", () => ({
  default: () => <div>HeroSection Mock</div>,
}));

import Login from "../../pages/Login";

describe("Login Page", () => {
  it("renderiza HeroSection", () => {
    render(<Login />);

    expect(
      screen.getByText("HeroSection Mock")
    ).toBeInTheDocument();
  });

  it("renderiza contenedor principal", () => {
    const { container } = render(<Login />);

    expect(
      container.querySelector(".login-page")
    ).toBeInTheDocument();
  });
});