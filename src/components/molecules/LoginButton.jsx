import { useAuth0 } from "@auth0/auth0-react";
import Button from "../atoms/Button";
import { auth0Config } from "../../auth/authConfig";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      text="iniciar sesion"
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            audience: auth0Config.audience,
            prompt: "login",
          },
        })
      }
      className=""
    ></Button>
  );
};

export default LoginButton;
