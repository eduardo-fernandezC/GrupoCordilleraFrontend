import "../../styles/components/atoms/StatCard.css";

const StatCard = ({ title, value }) => {
  return (
    <article className="stat-card">
      <h3 className="stat-card__title">{title}</h3>
      <p className="stat-card__value">{value}</p>
    </article>
  );
};

export default StatCard;
