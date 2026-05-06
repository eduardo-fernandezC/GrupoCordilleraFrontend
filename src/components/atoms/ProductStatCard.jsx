import "../../styles/components/atoms/ProductStatCard.css";
import Text from "./Text";

const ProductStatCard = ({ title, productName, quantity }) => {
  return (
    <article className="product-stat-card">
      <Text variant="h3" className="product-stat-card__title">
        {title}
      </Text>
      <Text variant="p" className="product-stat-card__name">
        {productName}
      </Text>
      <Text variant="span" className="product-stat-card__quantity">
        Cantidad: {quantity}
      </Text>
    </article>
  );
};

export default ProductStatCard;
