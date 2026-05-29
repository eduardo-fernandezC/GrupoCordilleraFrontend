import { NAME_REGEX, isEmailValid, PASSWORD_REGEX } from "./regex";

export const validateUserForm = (payload, originalUser = null) => {
  const errors = {};

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const password = payload.password?.trim();

  if (!name) {
    errors.name = "El nombre es obligatorio.";
  } else if (!NAME_REGEX.test(name)) {
    errors.name = "El nombre solo puede contener letras y espacios.";
  }

  if (!email) {
    errors.email = "El correo es obligatorio.";
  } else if (!isEmailValid(email)) {
    errors.email = "El correo no tiene un formato valido.";
  } else {
    const parts = String(email).split("@");
    const local = parts[0] || "";
    const domainLabel = (parts[1] || "").split(".")[0] || "";

    if (/^\d+$/.test(local) && /^\d+$/.test(domainLabel)) {
      errors.email =
        "El correo no puede contener solo numeros en usuario y dominio.";
    } else if (/^\d+$/.test(local)) {
      errors.email = "El usuario del correo no puede ser solo numeros.";
    } else if (/^\d+$/.test(domainLabel)) {
      errors.email = "El dominio del correo no puede ser solo numeros.";
    }
  }

  if (!originalUser && !password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (password && !PASSWORD_REGEX.test(password)) {
    errors.password =
      "La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial.";
  }

  if (originalUser) {
    const noChanges =
      name === originalUser.name && email === originalUser.email && !password;

    if (noChanges) {
      errors.general = "No se detectaron cambios para guardar.";
    }
  }

  return errors;
};
