import { validateUserForm } from "../../validations/user.validation";

describe("validateUserForm", () => {
  it("retorna un objeto vacío cuando el usuario es válido", () => {
    const payload = {
      name: "Juan Perez",
      email: "juan.perez@test.com",
      password: "Password1!",
    };

    const errors = validateUserForm(payload);

    expect(errors).toEqual({});
  });

  it("valida que el nombre sea obligatorio", () => {
    const payload = {
      name: "",
      email: "juan@test.com",
      password: "Password1!",
    };

    const errors = validateUserForm(payload);

    expect(errors.name).toBe("El nombre es obligatorio.");
  });

  it("valida que el nombre solo tenga letras y espacios", () => {
    const payload = {
      name: "Juan123",
      email: "juan@test.com",
      password: "Password1!",
    };

    const errors = validateUserForm(payload);

    expect(errors.name).toBe(
      "El nombre solo puede contener letras y espacios.",
    );
  });

  it("valida que el correo sea obligatorio", () => {
    const payload = {
      name: "Juan Perez",
      email: "",
      password: "Password1!",
    };

    const errors = validateUserForm(payload);

    expect(errors.email).toBe("El correo es obligatorio.");
  });

  it("valida que el correo tenga formato válido", () => {
    const payload = {
      name: "Juan Perez",
      email: "correo-malo",
      password: "Password1!",
    };

    const errors = validateUserForm(payload);

    expect(errors.email).toBe("El correo no tiene un formato valido.");
  });

  it("valida que el usuario del correo no sea solo números", () => {
    const payload = {
      name: "Juan Perez",
      email: "123@test.com",
      password: "Password1!",
    };

    const errors = validateUserForm(payload);

    expect(errors.email).toBe(
      "El usuario del correo no puede ser solo numeros.",
    );
  });

  it("valida que el dominio del correo no sea solo números", () => {
    const payload = {
      name: "Juan Perez",
      email: "juan@123.com",
      password: "Password1!",
    };

    const errors = validateUserForm(payload);

    expect(errors.email).toBe(
      "El dominio del correo no puede ser solo numeros.",
    );
  });

  it("valida cuando usuario y dominio del correo son solo números", () => {
    const payload = {
      name: "Juan Perez",
      email: "123@456.com",
      password: "Password1!",
    };

    const errors = validateUserForm(payload);

    expect(errors.email).toBe(
      "El correo no puede contener solo numeros en usuario y dominio.",
    );
  });

  it("valida que la contraseña sea obligatoria al crear usuario", () => {
    const payload = {
      name: "Juan Perez",
      email: "juan@test.com",
      password: "",
    };

    const errors = validateUserForm(payload);

    expect(errors.password).toBe("La contraseña es obligatoria.");
  });

  it("valida que la contraseña cumpla el formato requerido", () => {
    const payload = {
      name: "Juan Perez",
      email: "juan@test.com",
      password: "12345678",
    };

    const errors = validateUserForm(payload);

    expect(errors.password).toBe(
      "La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial.",
    );
  });

  it("detecta cuando no hay cambios al editar un usuario", () => {
    const originalUser = {
      name: "Juan Perez",
      email: "juan@test.com",
    };

    const payload = {
      name: "Juan Perez",
      email: "juan@test.com",
      password: "",
    };

    const errors = validateUserForm(payload, originalUser);

    expect(errors.general).toBe("No se detectaron cambios para guardar.");
  });

  it("permite editar usuario sin contraseña si hay cambios", () => {
    const originalUser = {
      name: "Juan Perez",
      email: "juan@test.com",
    };

    const payload = {
      name: "Juan Perez Actualizado",
      email: "juan@test.com",
      password: "",
    };

    const errors = validateUserForm(payload, originalUser);

    expect(errors.password).toBeUndefined();
    expect(errors.general).toBeUndefined();
  });
});
