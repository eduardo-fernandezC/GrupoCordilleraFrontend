import { useAuth0 } from "@auth0/auth0-react";
import Button from "../atoms/Button";
import { getRoles } from "../../auth/Roles";

const LogoutButton = () => {
  const { logout, user } = useAuth0();

  const roles = getRoles(user);
  const hasAssignedRole = roles.includes("ADMIN") || roles.includes("ANALISTA");

  const handleLogout = () => {
    if (hasAssignedRole) {
      const confirmed = window.confirm(
        "¿Estas seguro de que deseas cerra sesion?",
      );
      if (!confirmed) return;
    }
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
      federated: true,
    });
  };

  return <Button text="CERRAR SESION" onClick={handleLogout} className="" />;
};

export default LogoutButton;
