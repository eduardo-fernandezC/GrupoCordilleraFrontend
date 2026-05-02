import "../../styles/components/atoms/ErrorMessage.css";

const ErrorMessage = ({ message = "Ha ocurrido un error" }) => {
  return (
    <div className="not-found-page">
      <div className="error-message" role="alert">
        <span className="error-message__badge">Error</span>
        <p className="error-message__text">{message}</p>
      </div>
      <a href="/" className="not-found-page__link">
        🡸 Volver
      </a>
    </div>
  );
};

export default ErrorMessage;
