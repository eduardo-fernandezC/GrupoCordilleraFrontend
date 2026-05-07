import LandingTemplate from "../components/templates/LandingTemplate";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import "../styles/pages/Admin.css";
import { useNavigate } from "react-router-dom";

const Analyst = () => {
  const navigate = useNavigate();

  return (
    <LandingTemplate>
      <section className="admin-page">
        <div className="admin-page__hero">
          <div>
            <Text variant="p" className="admin-page__eyebrow">
              Panel de analista
            </Text>
            <Text variant="h1">Analista</Text>
            <Text variant="p" className="admin-page__intro">
              Analisa las ventas y productos desde un solo lugar, con acceso
              directo a los reportes de ventas y gestión de productos.
            </Text>
          </div>

          <div className="admin-page__actions">
            <Button
              text="Ver ventas de hoy"
              onClick={() => navigate("/ventasHoy")}
            />
            <Button
              text="Ver ventas del mes"
              onClick={() => navigate("/ventasMes")}
            />
          </div>
        </div>
      </section>
    </LandingTemplate>
  );
};

export default Analyst;
