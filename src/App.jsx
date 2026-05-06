import AppRoutes from "./app/AppRoutes";
import { NotificationContainer } from "./components/atoms/Notification";

function App() {
  return (
    <>
      <AppRoutes />
      <NotificationContainer />
    </>
  );
}

export default App;
