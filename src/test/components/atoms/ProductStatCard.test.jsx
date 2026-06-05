import { render, screen } from "@testing-library/react";
import ProductStatCard from "../../../components/atoms/ProductStatCard";

describe("ProductStatCard Component", () => {
  it("renderiza el título", () => {
    render(
      <ProductStatCard
        title="Más Vendido"
        productName="Mouse Gamer"
        quantity={10}
      />
    );

    expect(
      screen.getByText("Más Vendido")
    ).toBeInTheDocument();
  });

  it("renderiza el nombre del producto", () => {
    render(
      <ProductStatCard
        title="Más Vendido"
        productName="Mouse Gamer"
        quantity={10}
      />
    );

    expect(
      screen.getByText("Mouse Gamer")
    ).toBeInTheDocument();
  });

  it("renderiza la cantidad", () => {
    render(
      <ProductStatCard
        title="Más Vendido"
        productName="Mouse Gamer"
        quantity={10}
      />
    );

    expect(
      screen.getByText("Cantidad: 10")
    ).toBeInTheDocument();
  });

  it("renderiza como article", () => {
    const { container } = render(
      <ProductStatCard
        title="Más Vendido"
        productName="Mouse Gamer"
        quantity={10}
      />
    );

    expect(
      container.querySelector("article")
    ).toBeInTheDocument();
  });
});