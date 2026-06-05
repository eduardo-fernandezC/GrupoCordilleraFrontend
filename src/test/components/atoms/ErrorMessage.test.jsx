import { render, screen } from "@testing-library/react";
import ErrorMessage from "../../../components/atoms/ErrorMessage";

describe("ErrorMessage Component", () => {
  it("renderiza mensaje por defecto", () => {
    render(<ErrorMessage />);

    expect(
      screen.getByText("Ha ocurrido un error")
    ).toBeInTheDocument();
  });

  it("renderiza mensaje personalizado", () => {
    render(
      <ErrorMessage message="Usuario no encontrado" />
    );

    expect(
      screen.getByText("Usuario no encontrado")
    ).toBeInTheDocument();
  });

  it("renderiza la etiqueta Error", () => {
    render(<ErrorMessage />);

    expect(
      screen.getByText("Error")
    ).toBeInTheDocument();
  });

  it("renderiza el enlace volver", () => {
    render(<ErrorMessage />);

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/");
  });

  it("tiene role alert", () => {
    render(<ErrorMessage />);

    expect(
      screen.getByRole("alert")
    ).toBeInTheDocument();
  });
});