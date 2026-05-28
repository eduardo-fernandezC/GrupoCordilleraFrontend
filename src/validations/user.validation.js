const NAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isEmailValid = (value) => EMAIL_REGEX.test(String(value ?? "").trim());

export const validateUserForm = (payload, originalUser = null) => {
  const errors = {};

  if (!payload.name || !payload.name.trim()) {
    errors.name = "El nombre es obligatorio.";
  } else if (!NAME_REGEX.test(payload.name.trim())) {
    errors.name = "El nombre solo puede contener letras y espacios.";
  }

  if (!payload.email || !payload.email.trim()) {
    errors.email = "El correo es obligatorio.";
  } else if (!isEmailValid(payload.email)) {
    errors.email = "El correo no tiene un formato valido.";
  }

  if (!originalUser && (!payload.password || !payload.password.trim())) {
    errors.password = "La contraseña es obligatoria.";
  }

  if (originalUser) {
    const noChanges =
      (payload.name || "").trim() === (originalUser.name || "") &&
      (payload.email || "").trim() === (originalUser.email || "") &&
      !(payload.password || "").trim();

    if (noChanges) {
      errors.general = "No se detectaron cambios para guardar.";
    }
  }

  return errors;
};
