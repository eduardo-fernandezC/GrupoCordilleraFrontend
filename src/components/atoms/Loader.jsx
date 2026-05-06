import "../../styles/components/atoms/Loader.css";
import Text from "./Text";

const Loader = () => {
  return (
    <main
      className="loader-page"
      role="status"
      aria-live="polite"
      aria-label="Cargando contenido"
    >
      <div className="loader-shell">
        <div className="loader" aria-hidden="true"></div>
        <Text variant="p" className="loader__text">Cargando...</Text>
      </div>
    </main>
  );
};

export default Loader;
