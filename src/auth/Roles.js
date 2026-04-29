import { auth0Config } from "./authConfig";

export const getRoles = (user) => {
  return user?.[auth0Config.audience + "/roles"] || [];
};
