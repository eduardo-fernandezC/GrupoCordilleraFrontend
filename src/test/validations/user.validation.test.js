import { validateUserForm } from "../../validations/user.validation";

describe("validateUserForm", () => {
  const validUser = {
    name: "Rocio",
    email: "rocio@grupocordillera.cl",
    password: "Password1!",
  };

  it("no retorna errores con datos válidos", () => {
    expect(
      validateUserForm(validUser)
    ).toEqual({});
  });

  it("valida nombre obligatorio", () => {
    const result = validateUserForm({
      ...validUser,
      name: "",
    });

    expect(result.name).toBeDefined();
  });

  it("valida correo obligatorio", () => {
    const result = validateUserForm({
      ...validUser,
      email: "",
    });

    expect(result.email).toBeDefined();
  });

  it("valida correo inválido", () => {
    const result = validateUserForm({
      ...validUser,
      email: "rocio@gmail.com",
    });

    expect(result.email).toBeDefined();
  });

  it("valida contraseña obligatoria en creación", () => {
    const result = validateUserForm({
      ...validUser,
      password: "",
    });

    expect(result.password).toBeDefined();
  });

  it("valida contraseña débil", () => {
    const result = validateUserForm({
      ...validUser,
      password: "123",
    });

    expect(result.password).toBeDefined();
  });

  it("detecta usuario sin cambios", () => {
    const original = {
      name: "Rocio",
      email: "rocio@grupocordillera.cl",
    };

    const result = validateUserForm(
      {
        ...original,
        password: "",
      },
      original
    );

    expect(result.general).toBe(
      "No se detectaron cambios para guardar."
    );
  });

  it("valida usuario correo solo numérico", () => {
    const result = validateUserForm({
      ...validUser,
      email: "123@grupocordillera.cl",
    });

    expect(result.email).toContain(
      "usuario del correo"
    );
  });
});