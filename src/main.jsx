import ReactDOM from "react-dom/client";
import "./styles/styles.css";
import App from "./App.jsx";
import AuthProvider from "./auth/AuthProvider.jsx";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
