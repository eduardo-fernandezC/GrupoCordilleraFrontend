import { validateProductForm } from "../../validations/product.validation";

describe("validateProductForm", () => {
  const validProduct = {
    nombre: "Mouse",
    categoria: "Perifericos",
    precio: "1000",
    stock: "10",
  };

  it("no retorna errores con datos válidos", () => {
    expect(
      validateProductForm(validProduct)
    ).toEqual({});
  });

  it("valida nombre obligatorio", () => {
    const result = validateProductForm({
      ...validProduct,
      nombre: "",
    });

    expect(result.nombre).toBeDefined();
  });

  it("valida categoria obligatoria", () => {
    const result = validateProductForm({
      ...validProduct,
      categoria: "",
    });

    expect(result.categoria).toBeDefined();
  });

  it("valida precio mayor a cero", () => {
    const result = validateProductForm({
      ...validProduct,
      precio: "0",
    });

    expect(result.precio).toBeDefined();
  });

  it("valida stock entero", () => {
    const result = validateProductForm({
      ...validProduct,
      stock: "abc",
    });

    expect(result.stock).toBeDefined();
  });

  it("valida stock negativo", () => {
    const result = validateProductForm({
      ...validProduct,
      stock: "-1",
    });

    expect(result.stock).toBeDefined();
  });

  it("detecta que no hubo cambios", () => {
    const result = validateProductForm(
      validProduct,
      validProduct
    );

    expect(result.general).toBe(
      "No se detectaron cambios para guardar."
    );
  });

  it("valida nombre con caracteres inválidos", () => {
    const result = validateProductForm({
      ...validProduct,
      nombre: "Mouse123",
    });

    expect(result.nombre).toContain(
      "solo puede contener letras"
    );
  });
});