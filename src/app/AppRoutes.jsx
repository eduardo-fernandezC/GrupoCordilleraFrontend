import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "../routes/ProtectedRoute";
import Admin from "../pages/admin/Admin";
import VentasHoyPage from "../pages/VentasHoyPage";
import VentasMesPage from "../pages/VentasMesPage";
import ProductosPage from "../pages/ProductosPage";
import Analyst from "../pages/Analyst";
import NotFound from "../pages/NotFound";
import VentasCrecimientoPage from "../pages/VentasCrecimientoPage";
import SucursalPage from "../pages/SucursalPage";
import Unauthorized from "../pages/Unauthorized";
import AdminProductsPage from "../pages/admin/AdminProductsPage";
import SalesReportPage from "../pages/admin/SalesReportPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import ReportesPage from "../pages/admin/ReportesPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

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
          path="/adminVentas"
          element={
            <ProtectedRoute role="ADMIN">
              <SalesReportPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adminProductos"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminProductsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adminUsuarios"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminUsersPage />
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
        <Route
          path="/adminReportes"
          element={
            <ProtectedRoute role="ADMIN">
              <ReportesPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
