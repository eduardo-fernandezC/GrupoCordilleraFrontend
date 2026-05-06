import "../../styles/components/atoms/ErrorMessage.css";
import Text from "./Text";

const ErrorMessage = ({ message = "Ha ocurrido un error" }) => {
  return (
    <div className="not-found-page">
      <div className="error-message" role="alert">
        <Text variant="span" className="error-message__badge">Error</Text>
        <Text variant="p" className="error-message__text">{message}</Text>
      </div>
      <a href="/" className="not-found-page__link">🡸 Volver</a>
    </div>
  );
};

export default ErrorMessage;
