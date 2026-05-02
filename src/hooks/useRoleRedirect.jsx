import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRoles } from "../auth/Roles";

const useRoleRedirect = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      const roles = getRoles(user);

      if (roles.includes("ADMIN")) {
        navigate("/admin");
      } else if (roles.includes("ANALISTA")) {
        navigate("/analista");
      } else {
        navigate("/unauthorized");
      }
    }
  }, [isAuthenticated, user, isLoading, navigate]);
};

export default useRoleRedirect;
