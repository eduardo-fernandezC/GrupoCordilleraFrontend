import LoginButton from "../molecules/LoginButton";

const HeroSection = () => {
  return (
    <section>
      <div>
        <h1>Bienvendio a Grupo Cordillera</h1>
        <p>Accede de forma segura al panel de analisis y gestion de ventas</p>
        <div>
          <LoginButton />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
