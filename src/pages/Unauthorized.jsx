import LogoutButton from "../components/molecules/LogoutButton";

const Unauthorized = () => {
  return (
    <div>
      <div>
        <h1>403</h1>
        <h2>Acceso no autorizado</h2>
        <p>
          No tienes permisos suficientes para acceder al Dashboard de
          <strong> Grupo Cordillera</strong>
        </p>
        <p>Cierra sesion e intentalo mas tarde</p>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Unauthorized;
