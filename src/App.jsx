import AppRoutes from "./app/AppRoutes";
import NotificationContainer from "./components/atoms/Notification";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const accessToken = useAuth0().getAccessTokenSilently();
  accessToken
    .then((token) => {
      console.log("Access Token:", token);
    })
    .catch((error) => {
      console.error("Error getting access token:", error);
    });
  return (
    <>
      <AppRoutes />
      <NotificationContainer />
    </>
  );
}

export default App;
