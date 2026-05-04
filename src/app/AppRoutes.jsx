import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "../routes/ProtectedRoute";
import Admin from "../pages/Admin";
import VentasHoyPage from "../pages/VentasHoyPage";
import VentasMesPage from "../pages/VentasMesPage";
import ProductosPage from "../pages/ProductosPage";
import Analyst from "../pages/Analyst";
import NotFound from "../pages/NotFound";
import VentasCrecimientoPage from "../pages/VentasCrecimientoPage";
import SucursalPage from "../pages/SucursalPage";
import Unauthorized from "../pages/Unauthorized";
import AdminProductsPage from "../pages/AdminProductsPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="*" element={<NotFound />} />

        <Route
          path="/unauthorized"
          element={
            <ProtectedRoute unauthorizedOnly={true}>
              <Unauthorized />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/ventasHoy"
          element={
            <ProtectedRoute>
              <VentasHoyPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ventasMes"
          element={
            <ProtectedRoute>
              <VentasMesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/productos"
          element={
            <ProtectedRoute>
              <ProductosPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ventasCrecimiento"
          element={
            <ProtectedRoute role="ADMIN">
              <VentasCrecimientoPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sucursal"
          element={
            <ProtectedRoute role="ADMIN">
              <SucursalPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/AdminProductos"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminProductsPage />
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
