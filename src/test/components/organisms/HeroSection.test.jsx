import { render, screen } from "@testing-library/react";
import HeroSection from "../../../components/organisms/HeroSection";

describe("HeroSection Component", () => {
  it("renderiza el título principal", () => {
    render(<HeroSection />);

    expect(
      screen.getByText("Bienvenido a Grupo Cordillera")
    ).toBeInTheDocument();
  });

  it("renderiza el texto descriptivo", () => {
    render(<HeroSection />);

    expect(
      screen.getByText(
        "Accede de forma segura al panel de analisis y gestion de ventas"
      )
    ).toBeInTheDocument();
  });

  it("renderiza el botón de login", () => {
    render(<HeroSection />);

    expect(
      screen.getByText("INICIAR SESION")
    ).toBeInTheDocument();
  });
});