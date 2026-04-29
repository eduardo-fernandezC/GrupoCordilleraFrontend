import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "../routes/ProtectedRoute";
import Admin from "../pages/Admin";
import Analyst from "../pages/Analyst";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="*" element={<NotFound />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analista"
          element={
            <ProtectedRoute role="ANALISTA">
              <Analyst />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
