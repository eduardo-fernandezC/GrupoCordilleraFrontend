import { auth0Config } from "./authConfig";

export const getRoles = (user) => {
  return (
    user?.[auth0Config.audience + import.meta.env.VITE_ROLES_ENDPOINT] || []
  );
};
