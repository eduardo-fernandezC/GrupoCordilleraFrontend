import { render, screen } from "@testing-library/react";
import Loader from "../../../components/atoms/Loader";

describe("Loader Component", () => {
  it("renderiza el texto de carga", () => {
    render(<Loader />);

    expect(
      screen.getByText("Cargando...")
    ).toBeInTheDocument();
  });

  it("tiene role status", () => {
    render(<Loader />);

    expect(
      screen.getByRole("status")
    ).toBeInTheDocument();
  });

  it("tiene aria-label correcto", () => {
    render(<Loader />);

    expect(
      screen.getByRole("status")
    ).toHaveAttribute(
      "aria-label",
      "Cargando contenido"
    );
  });

  it("tiene aria-live polite", () => {
    render(<Loader />);

    expect(
      screen.getByRole("status")
    ).toHaveAttribute(
      "aria-live",
      "polite"
    );
  });
});