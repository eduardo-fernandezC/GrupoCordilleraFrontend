import "../../styles/components/atoms/ProductStatCard.css";

const ProductStatCard = ({ title, productName, quantity }) => {
  return (
    <article className="product-stat-card">
      <h3 className="product-stat-card__title">{title}</h3>
      <p className="product-stat-card__name">{productName}</p>
      <span className="product-stat-card__quantity">Cantidad: {quantity}</span>
    </article>
  );
};

export default ProductStatCard;
