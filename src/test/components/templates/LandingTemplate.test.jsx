import { render, screen } from "@testing-library/react";
import LandingTemplate from "../../../components/templates/LandingTemplate";

vi.mock("../../../components/organisms/Navbar", () => ({
  default: () => <div>Navbar Mock</div>,
}));

vi.mock("../../../components/organisms/Footer", () => ({
  default: () => <div>Footer Mock</div>,
}));

describe("LandingTemplate Component", () => {
  it("renderiza Navbar", () => {
    render(
      <LandingTemplate>
        <div>Contenido</div>
      </LandingTemplate>
    );

    expect(
      screen.getByText("Navbar Mock")
    ).toBeInTheDocument();
  });

  it("renderiza Footer", () => {
    render(
      <LandingTemplate>
        <div>Contenido</div>
      </LandingTemplate>
    );

    expect(
      screen.getByText("Footer Mock")
    ).toBeInTheDocument();
  });

  it("renderiza children", () => {
    render(
      <LandingTemplate>
        <div>Contenido Principal</div>
      </LandingTemplate>
    );

    expect(
      screen.getByText("Contenido Principal")
    ).toBeInTheDocument();
  });

  it("renderiza la estructura principal", () => {
    const { container } = render(
      <LandingTemplate>
        <div>Contenido</div>
      </LandingTemplate>
    );

    expect(
      container.querySelector(".app-shell")
    ).toBeInTheDocument();

    expect(
      container.querySelector(".app-shell__main")
    ).toBeInTheDocument();

    expect(
      container.querySelector(".app-shell__content")
    ).toBeInTheDocument();
  });
});