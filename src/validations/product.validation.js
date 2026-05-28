const INTEGER_REGEX = /^\d+$/;
const PRODUCT_NAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
const CATEGORY_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

const isIntegerString = (value) =>
  INTEGER_REGEX.test(String(value ?? "").trim());

export const validateProductForm = (payload, originalProduct = null) => {
  const errors = {};

  if (!payload.nombre || !payload.nombre.trim()) {
    errors.nombre = "El nombre es obligatorio.";
  } else if (!PRODUCT_NAME_REGEX.test(payload.nombre.trim())) {
    errors.nombre = "El nombre solo puede contener letras y espacios.";
  }

  if (!payload.categoria || !payload.categoria.trim()) {
    errors.categoria = "La categoria es obligatoria.";
  } else if (!CATEGORY_REGEX.test(payload.categoria.trim())) {
    errors.categoria = "La categoria solo puede contener letras y espacios.";
  }

  if (
    payload.precio === undefined ||
    payload.precio === null ||
    Number(payload.precio) <= 0
  ) {
    errors.precio = "El precio debe ser mayor a 0.";
  }

  if (!isIntegerString(payload.stock)) {
    errors.stock = "El stock debe ser un numero entero.";
  } else if (Number(payload.stock) < 0) {
    errors.stock = "El stock no puede ser negativo.";
  }

  if (originalProduct) {
    const noChanges =
      (payload.nombre || "").trim() === (originalProduct.nombre || "") &&
      (payload.categoria || "").trim() === (originalProduct.categoria || "") &&
      Number(payload.precio) === Number(originalProduct.precio) &&
      Number(payload.stock) === Number(originalProduct.stock);

    if (noChanges) {
      errors.general = "No se detectaron cambios para guardar.";
    }
  }

  return errors;
};
