import AppRoutes from "./app/AppRoutes";
import NotificationContainer from "./components/atoms/Notification";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  return (
    <>
      <AppRoutes />
      <NotificationContainer />
    </>
  );
}

export default App;
