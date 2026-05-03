import { useAuth0 } from "@auth0/auth0-react";
import AppRoutes from "./app/AppRoutes";

function App() {
  const { user } = useAuth0();

  const role = user?.["https://grupo-cordillera-api/roles"] || user?.role;

  console.log(user);
  console.log(role);
  return <AppRoutes />;
}

export default App;
