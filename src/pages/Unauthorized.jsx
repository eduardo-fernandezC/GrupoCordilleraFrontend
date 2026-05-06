import LogoutButton from "../components/molecules/LogoutButton";
import Text from "../components/atoms/Text";
import "../styles/pages/Unauthorized.css";

const Unauthorized = () => {
  return (
    <main className="unauthorized-page">
      <section className="unauthorized-card">
        <div className="unauthorized-card__status">403</div>
        <Text variant="h1">Acceso no autorizado</Text>
        <Text variant="p">
          No tienes permisos suficientes para acceder al Dashboard de{" "}
          <strong>Grupo Cordillera</strong>.
        </Text>
        <Text variant="p">Cierra sesion e intentalo mas tarde.</Text>
        <div className="unauthorized-card__actions">
          <LogoutButton />
        </div>
      </section>
    </main>
  );
};

export default Unauthorized;
