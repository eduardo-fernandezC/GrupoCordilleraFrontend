import { render, screen } from "@testing-library/react";
import FooterInfo from "../../../components/molecules/FooterInfo";

describe("FooterInfo Component", () => {
  it("renderiza el nombre del sistema", () => {
    render(<FooterInfo />);

    expect(
      screen.getByText("Grupo Cordillera Dashboard")
    ).toBeInTheDocument();
  });

  it("renderiza la versión", () => {
    render(<FooterInfo />);

    expect(
      screen.getByText(/v1.0.0/i)
    ).toBeInTheDocument();
  });

  it("renderiza el año", () => {
    render(<FooterInfo />);

    expect(
      screen.getByText(/© 2026/i)
    ).toBeInTheDocument();
  });
});