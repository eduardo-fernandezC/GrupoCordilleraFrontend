import { useAuth0 } from "@auth0/auth0-react";
import Button from "../atoms/Button";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return <Button text="CERRAR SESION" onClick={handleLogout} className="" />;
};

export default LogoutButton;
