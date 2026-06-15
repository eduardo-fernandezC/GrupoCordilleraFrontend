import { render, screen } from "@testing-library/react";
import DashboardHeader from "../../../components/molecules/DashboardHeader";

describe("DashboardHeader Component", () => {
  it("renderiza el título", () => {
    render(
      <DashboardHeader
        title="Dashboard"
        subtitle="Bienvenido"
      />
    );

    expect(
      screen.getByText("Dashboard")
    ).toBeInTheDocument();
  });

  it("renderiza el subtítulo", () => {
    render(
      <DashboardHeader
        title="Dashboard"
        subtitle="Bienvenido"
      />
    );

    expect(
      screen.getByText("Bienvenido")
    ).toBeInTheDocument();
  });

  it("aplica la clase dashboard-header", () => {
    const { container } = render(
      <DashboardHeader
        title="Dashboard"
        subtitle="Bienvenido"
      />
    );

    expect(
      container.querySelector(".dashboard-header")
    ).toBeInTheDocument();
  });
});