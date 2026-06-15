import { render, screen } from "@testing-library/react";
import StatCard from "../../../components/atoms/StatCard";

describe("StatCard Component", () => {
  it("renderiza el título", () => {
    render(
      <StatCard
        title="Ventas"
        value="150"
      />
    );

    expect(
      screen.getByText("Ventas")
    ).toBeInTheDocument();
  });

  it("renderiza el valor", () => {
    render(
      <StatCard
        title="Ventas"
        value="150"
      />
    );

    expect(
      screen.getByText("150")
    ).toBeInTheDocument();
  });

  it("renderiza como article", () => {
    const { container } = render(
      <StatCard
        title="Ventas"
        value="150"
      />
    );

    expect(
      container.querySelector("article")
    ).toBeInTheDocument();
  });

  it("aplica clase stat-card", () => {
    const { container } = render(
      <StatCard
        title="Ventas"
        value="150"
      />
    );

    expect(
      container.querySelector(".stat-card")
    ).toBeInTheDocument();
  });
});