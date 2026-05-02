import "../../styles/components/atoms/Loader.css";

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
        <p className="loader__text">Cargando...</p>
      </div>
    </main>
  );
};

export default Loader;
