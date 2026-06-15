import { render, screen } from "@testing-library/react";
import NotFound from "../../pages/NotFound";

describe("NotFound Page", () => {
  it("renderiza codigo 404", () => {
    render(<NotFound />);

    expect(
      screen.getByText("404")
    ).toBeInTheDocument();
  });

  it("renderiza imagen", () => {
    render(<NotFound />);

    expect(
      screen.getByAltText("404")
    ).toBeInTheDocument();
  });

  it("renderiza enlace volver", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("link", {
        name: /volver/i,
      })
    ).toHaveAttribute("href", "/");
  });
});