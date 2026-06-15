import { useNavigate } from "react-router-dom";
import LandingTemplate from "../../components/templates/LandingTemplate";
import Text from "../../components/atoms/Text";
import Button from "../../components/atoms/Button";
import "../../styles/pages/Admin.css";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <LandingTemplate>
      <section className="admin-page">
        <div className="admin-page__hero">
          <div>
            <Text variant="p" className="admin-page__eyebrow">
              Panel de administracion
            </Text>
            <Text variant="h1">Admin</Text>
            <Text variant="p" className="admin-page__intro">
              Gestiona productos y revisa el reporte de ventas desde un solo
              lugar.
            </Text>
          </div>

          <div className="admin-page__actions">
            <Button text="Ver ventas" onClick={() => navigate("/adminVentas")} />
            <Button
              text="Administrar productos"
              onClick={() => navigate("/adminProductos")}
            />
            <Button text="Ver reportes" onClick={() => navigate("/adminReportes")} />
        </div>
        </div>
      </section>
    </LandingTemplate>
  );
};

export default Admin;
