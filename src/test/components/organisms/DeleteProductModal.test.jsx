import { render, screen } from "@testing-library/react";
import DeleteProductModal from "../../../components/organisms/DeleteProductModal";

describe("DeleteProductModal Component", () => {
  const product = {
    nombre: "Notebook Gamer",
  };

  it("abre modal cuando existe producto", () => {
    render(
      <DeleteProductModal
        product={product}
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    );

    expect(
      screen.getByText(/Borrar Notebook Gamer/i)
    ).toBeInTheDocument();
  });

  it("no renderiza modal cuando no existe producto", () => {
    render(
      <DeleteProductModal
        product={null}
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    );

    expect(
      screen.queryByRole("dialog")
    ).not.toBeInTheDocument();
  });
});