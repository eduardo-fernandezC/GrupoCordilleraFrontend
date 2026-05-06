import LoginButton from "../molecules/LoginButton";
import Text from "../atoms/Text";
import "../../styles/components/organisms/HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-section__card">
        <Text variant="h1" className="hero-section__title">
          Bienvenido a Grupo Cordillera
        </Text>
        <Text variant="p" className="hero-section__text">
          Accede de forma segura al panel de analisis y gestion de ventas
        </Text>
        <div className="hero-section__actions">
          <LoginButton />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
