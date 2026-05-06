import "../styles/pages/NotFound.css";
import Text from "../components/atoms/Text";

const NotFound = () => {
  return (
    <main className="not-found-page">
      <div className="not-found-page__content">
        <Text variant="h1" className="hero-section__title">
          404
        </Text>
        <img
          className="not-found-page__image"
          src="https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUyOXZ1dnlobGF3N3JtM3h3YWNlbHF5M21sdm5td2pxbzEyaGU3OHBsMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/NTur7XlVDUdqM/source.gif"
          alt="404"
        />
        <a className="not-found-page__link" href="/">
          🡸 Volver
        </a>
      </div>
    </main>
  );
};

export default NotFound;
