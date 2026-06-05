import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import FormSection from "../../../components/organisms/FormSection";

describe("FormSection Component", () => {
  const product = {
    nombre: "Mouse",
    categoria: "Periféricos",
    precio: "10000",
    stock: "10",
  };

  it("renderiza los datos iniciales", () => {
    render(
      <FormSection
        product={product}
        errors={{}}
        onSave={() => {}}
        onCancel={() => {}}
      />
    );

    expect(
      screen.getByDisplayValue("Mouse")
    ).toBeInTheDocument();
  });

  it("actualiza el nombre", () => {
    render(
      <FormSection
        product={product}
        errors={{}}
        onSave={() => {}}
        onCancel={() => {}}
      />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Nombre del producto"),
      {
        target: { value: "Teclado" },
      }
    );

    expect(
      screen.getByDisplayValue("Teclado")
    ).toBeInTheDocument();
  });

  it("sanitiza precio eliminando letras", () => {
    render(
        <FormSection
        product={product}
        errors={{}}
        onSave={() => {}}
        onCancel={() => {}}
        />
  );

  const precioInput =
    screen.getAllByPlaceholderText("0")[0];

  fireEvent.change(precioInput, {
    target: {
      name: "precio",
      value: "123abc",
    },
  });

  expect(
    screen.getByDisplayValue("123")
  ).toBeInTheDocument();
  });

  it("ejecuta onCancel", () => {
    const onCancel = vi.fn();

    render(
      <FormSection
        product={product}
        errors={{}}
        onSave={() => {}}
        onCancel={onCancel}
      />
    );

    fireEvent.click(
      screen.getByText("Cancelar")
    );

    expect(onCancel).toHaveBeenCalled();
  });

  it("ejecuta onSave", () => {
    const onSave = vi.fn();

    render(
        <FormSection
        product={product}
        errors={{}}
        onSave={onSave}
        onCancel={() => {}}
        />
    );

    fireEvent.click(
        screen.getByText("Guardar")
    );

    expect(onSave).toHaveBeenCalled();
  });
});