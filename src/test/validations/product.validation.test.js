import { validateProductForm } from "../../validations/product.validation";

describe("validateProductForm", () => {
  it("retorna un objeto vacío cuando el producto es válido", () => {
    const payload = {
      nombre: "Pan",
      categoria: "Alimentos",
      precio: "1200",
      stock: "10",
    };

    const errors = validateProductForm(payload);

    expect(errors).toEqual({});
  });

  it("valida que el nombre sea obligatorio", () => {
    const payload = {
      nombre: "",
      categoria: "Alimentos",
      precio: "1200",
      stock: "10",
    };

    const errors = validateProductForm(payload);

    expect(errors.nombre).toBe("El nombre es obligatorio.");
  });

  it("valida que el nombre solo tenga letras y espacios", () => {
    const payload = {
      nombre: "Pan123",
      categoria: "Alimentos",
      precio: "1200",
      stock: "10",
    };

    const errors = validateProductForm(payload);

    expect(errors.nombre).toBe(
      "El nombre solo puede contener letras y espacios.",
    );
  });

  it("valida que la categoria sea obligatoria", () => {
    const payload = {
      nombre: "Pan",
      categoria: "",
      precio: "1200",
      stock: "10",
    };

    const errors = validateProductForm(payload);

    expect(errors.categoria).toBe("La categoria es obligatoria.");
  });

  it("valida que la categoria solo tenga letras y espacios", () => {
    const payload = {
      nombre: "Pan",
      categoria: "Alimentos123",
      precio: "1200",
      stock: "10",
    };

    const errors = validateProductForm(payload);

    expect(errors.categoria).toBe(
      "La categoria solo puede contener letras y espacios.",
    );
  });

  it("valida que el precio sea mayor a 0", () => {
    const payload = {
      nombre: "Pan",
      categoria: "Alimentos",
      precio: "0",
      stock: "10",
    };

    const errors = validateProductForm(payload);

    expect(errors.precio).toBe("El precio debe ser mayor a 0.");
  });

  it("valida que el stock sea un número entero", () => {
    const payload = {
      nombre: "Pan",
      categoria: "Alimentos",
      precio: "1200",
      stock: "10.5",
    };

    const errors = validateProductForm(payload);

    expect(errors.stock).toBe("El stock debe ser un numero entero.");
  });

  it("detecta cuando no hay cambios al editar un producto", () => {
    const originalProduct = {
      nombre: "Pan",
      categoria: "Alimentos",
      precio: 1200,
      stock: 10,
    };

    const payload = {
      nombre: "Pan",
      categoria: "Alimentos",
      precio: "1200",
      stock: "10",
    };

    const errors = validateProductForm(payload, originalProduct);

    expect(errors.general).toBe("No se detectaron cambios para guardar.");
  });

  it("no muestra error general cuando hay cambios al editar un producto", () => {
    const originalProduct = {
      nombre: "Pan",
      categoria: "Alimentos",
      precio: 1200,
      stock: 10,
    };

    const payload = {
      nombre: "Pan Integral",
      categoria: "Alimentos",
      precio: "1200",
      stock: "10",
    };

    const errors = validateProductForm(payload, originalProduct);

    expect(errors.general).toBeUndefined();
  });
});
