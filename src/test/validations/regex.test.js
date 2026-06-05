import {
  isEmailValid,
  isIntegerString,
  PASSWORD_REGEX,
} from "../../validations/regex";

describe("regex validations", () => {
  it("valida correo correcto", () => {
    expect(
      isEmailValid("rocio@grupocordillera.cl")
    ).toBe(true);
  });

  it("rechaza correo de otro dominio", () => {
    expect(
      isEmailValid("rocio@gmail.com")
    ).toBe(false);
  });

  it("valida entero correcto", () => {
    expect(
      isIntegerString("123")
    ).toBe(true);
  });

  it("rechaza entero inválido", () => {
    expect(
      isIntegerString("123abc")
    ).toBe(false);
  });

  it("valida contraseña fuerte", () => {
    expect(
      PASSWORD_REGEX.test("Password1!")
    ).toBe(true);
  });

  it("rechaza contraseña débil", () => {
    expect(
      PASSWORD_REGEX.test("123")
    ).toBe(false);
  });
});