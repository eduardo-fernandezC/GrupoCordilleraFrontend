import "../../styles/components/atoms/StatCard.css";
import Text from "./Text";

const StatCard = ({ title, value }) => {
  return (
    <article className="stat-card">
      <Text variant="h3" className="stat-card__title">
        {title}
      </Text>
      <Text variant="p" className="stat-card__value">
        {value}
      </Text>
    </article>
  );
};

export default StatCard;
