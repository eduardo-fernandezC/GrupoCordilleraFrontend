import { TEXT_ONLY_REGEX, isIntegerString } from "./regex";

export const validateProductForm = (payload, originalProduct = null) => {
  const errors = {};

  const nombre = payload.nombre?.trim();
  const categoria = payload.categoria?.trim();
  const precio = Number(payload.precio);
  const stockRaw = payload.stock;

  if (!nombre) {
    errors.nombre = "El nombre es obligatorio.";
  } else if (!TEXT_ONLY_REGEX.test(nombre)) {
    errors.nombre = "El nombre solo puede contener letras y espacios.";
  }

  if (!categoria) {
    errors.categoria = "La categoria es obligatoria.";
  } else if (!TEXT_ONLY_REGEX.test(categoria)) {
    errors.categoria = "La categoria solo puede contener letras y espacios.";
  }

  if (!precio || precio <= 0) {
    errors.precio = "El precio debe ser mayor a 0.";
  }

  if (!isIntegerString(stockRaw)) {
    errors.stock = "El stock debe ser un numero entero.";
  } else {
    const stock = Number(stockRaw);
    if (stock < 0) {
      errors.stock = "El stock no puede ser negativo.";
    }
  }

  if (originalProduct) {
    const noChanges =
      nombre === originalProduct.nombre &&
      categoria === originalProduct.categoria &&
      precio === Number(originalProduct.precio) &&
      Number(stockRaw) === Number(originalProduct.stock);

    if (noChanges) {
      errors.general = "No se detectaron cambios para guardar.";
    }
  }

  return errors;
};
