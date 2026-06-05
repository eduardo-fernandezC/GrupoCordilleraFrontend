import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ProductTable from "../../../components/organisms/ProductTable";

describe("ProductTable Component", () => {
  const products = [
    {
      idProducto: 1,
      nombre: "Mouse",
      categoria: "Periféricos",
      precio: 10000,
      stock: 15,
    },
  ];

  it("muestra mensaje cuando no hay productos", () => {
    render(
      <ProductTable
        products={[]}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(
      screen.getByText("No hay productos cargados aun.")
    ).toBeInTheDocument();
  });

  it("renderiza producto", () => {
    render(
      <ProductTable
        products={products}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(
      screen.getByText("Mouse")
    ).toBeInTheDocument();
  });

  it("ejecuta editar", () => {
    const onEdit = vi.fn();

    render(
      <ProductTable
        products={products}
        onEdit={onEdit}
        onDelete={() => {}}
      />
    );

    fireEvent.click(
      screen.getByText("Editar")
    );

    expect(onEdit).toHaveBeenCalled();
  });

  it("ejecuta eliminar", () => {
    const onDelete = vi.fn();

    render(
      <ProductTable
        products={products}
        onEdit={() => {}}
        onDelete={onDelete}
      />
    );

    fireEvent.click(
      screen.getByText("Eliminar")
    );

    expect(onDelete).toHaveBeenCalled();
  });
});