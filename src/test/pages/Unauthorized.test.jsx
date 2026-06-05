import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("../../components/molecules/LogoutButton", () => ({
  default: () => <button>Logout Mock</button>,
}));

import Unauthorized from "../../pages/Unauthorized";

describe("Unauthorized Page", () => {
  it("renderiza codigo 403", () => {
    render(<Unauthorized />);

    expect(
      screen.getByText("403")
    ).toBeInTheDocument();
  });

  it("renderiza mensaje principal", () => {
    render(<Unauthorized />);

    expect(
      screen.getByText(/acceso no autorizado/i)
    ).toBeInTheDocument();
  });

  it("renderiza LogoutButton", () => {
    render(<Unauthorized />);

    expect(
      screen.getByText("Logout Mock")
    ).toBeInTheDocument();
  });
});