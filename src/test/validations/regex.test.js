import {
  PASSWORD_REGEX,
  NAME_REGEX,
  TEXT_ONLY_REGEX,
  EMAIL_REGEX,
  INTEGER_REGEX,
  isEmailValid,
  isIntegerString,
} from "../../validations/regex";

describe("regex validations", () => {
  it("valida una contraseña correcta", () => {
    expect(PASSWORD_REGEX.test("Password1!")).toBe(true);
  });

  it("rechaza una contraseña sin mayúscula, minúscula, número o carácter especial", () => {
    expect(PASSWORD_REGEX.test("password")).toBe(false);
  });

  it("valida nombres con letras, espacios y tildes", () => {
    expect(NAME_REGEX.test("José Muñoz")).toBe(true);
  });

  it("rechaza nombres con números", () => {
    expect(NAME_REGEX.test("José123")).toBe(false);
  });

  it("TEXT_ONLY_REGEX usa la misma validación de NAME_REGEX", () => {
    expect(TEXT_ONLY_REGEX.test("Alimentos Frescos")).toBe(true);

    expect(TEXT_ONLY_REGEX.test("Alimentos123")).toBe(false);
  });

  it("valida correos con EMAIL_REGEX", () => {
    expect(EMAIL_REGEX.test("test@correo.com")).toBe(true);
  });

  it("rechaza correos inválidos con EMAIL_REGEX", () => {
    expect(EMAIL_REGEX.test("correo-malo")).toBe(false);
  });

  it("isEmailValid limpia espacios antes de validar", () => {
    expect(isEmailValid("  test@correo.com  ")).toBe(true);
  });

  it("valida números enteros con INTEGER_REGEX", () => {
    expect(INTEGER_REGEX.test("123")).toBe(true);
  });

  it("rechaza decimales con INTEGER_REGEX", () => {
    expect(INTEGER_REGEX.test("12.5")).toBe(false);
  });

  it("isIntegerString limpia espacios antes de validar", () => {
    expect(isIntegerString("  25  ")).toBe(true);
  });

  it("isIntegerString rechaza números negativos", () => {
    expect(isIntegerString("-5")).toBe(false);
  });
});
