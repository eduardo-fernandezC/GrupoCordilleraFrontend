import { useAuth0 } from "@auth0/auth0-react";
import Button from "../atoms/Button";
import { auth0Config } from "../../auth/authConfig";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        audience: auth0Config.audience,
        prompt: "login",
      },
    });
  };

  return (
    <Button text="INICIAR SESION" onClick={handleLogin} className=""></Button>
  );
};

export default LoginButton;
