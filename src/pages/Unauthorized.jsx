import LogoutButton from "../components/molecules/LogoutButton";
import "../styles/pages/Unauthorized.css";

const Unauthorized = () => {
  return (
    <main className="unauthorized-page">
      <section className="unauthorized-card">
        <div className="unauthorized-card__status">403</div>
        <h1>Acceso no autorizado</h1>
        <p>
          No tienes permisos suficientes para acceder al Dashboard de{" "}
          <strong>Grupo Cordillera</strong>.
        </p>
        <p>Cierra sesion e intentalo mas tarde.</p>
        <div className="unauthorized-card__actions">
          <LogoutButton />
        </div>
      </section>
    </main>
  );
};

export default Unauthorized;
