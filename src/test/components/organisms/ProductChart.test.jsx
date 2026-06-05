import { render, screen } from "@testing-library/react";
import ProductChart from "../../../components/organisms/ProductChart";

describe("ProductChart Component", () => {
  it("muestra estado vacío", () => {
    render(
      <ProductChart
        productoMasVendido={null}
        productoMenosVendido={null}
      />
    );

    expect(
      screen.getByText(
        "No hay productos destacados disponibles en este momento."
      )
    ).toBeInTheDocument();
  });

  it("renderiza producto más vendido", () => {
    render(
      <ProductChart
        productoMasVendido={{
          nombreProducto: "Mouse",
          cantidad: 15,
        }}
      />
    );

    expect(
      screen.getByText("Mouse")
    ).toBeInTheDocument();
  });

  it("renderiza producto menos vendido", () => {
    render(
      <ProductChart
        productoMenosVendido={{
          nombreProducto: "Teclado",
          cantidad: 2,
        }}
      />
    );

    expect(
      screen.getByText("Teclado")
    ).toBeInTheDocument();
  });

  it("renderiza ambos productos", () => {
    render(
      <ProductChart
        productoMasVendido={{
          nombreProducto: "Mouse",
          cantidad: 15,
        }}
        productoMenosVendido={{
          nombreProducto: "Teclado",
          cantidad: 2,
        }}
      />
    );

    expect(screen.getByText("Mouse")).toBeInTheDocument();
    expect(screen.getByText("Teclado")).toBeInTheDocument();
  });
});