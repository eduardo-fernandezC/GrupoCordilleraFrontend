export const PASSWORD_PATTERN =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$";

export const PASSWORD_REGEX = new RegExp(PASSWORD_PATTERN);

export const NAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
export const TEXT_ONLY_REGEX = NAME_REGEX;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const INTEGER_REGEX = /^\d+$/;

export const isEmailValid = (value) =>
  EMAIL_REGEX.test(String(value ?? "").trim());

export const isIntegerString = (value) =>
  INTEGER_REGEX.test(String(value ?? "").trim());

export default {
  PASSWORD_PATTERN,
  PASSWORD_REGEX,
  NAME_REGEX,
  TEXT_ONLY_REGEX,
  EMAIL_REGEX,
  INTEGER_REGEX,
  isEmailValid,
  isIntegerString,
};
