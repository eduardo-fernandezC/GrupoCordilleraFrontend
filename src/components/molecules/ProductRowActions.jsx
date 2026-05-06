import "../../styles/components/molecules/ProductRowActions.css";
import Button from "../atoms/Button";

const ProductRowActions = ({ onEdit, onDelete }) => {
  return (
    <div className="product-row-actions">
      <Button
        className="product-row-actions__button product-row-actions__button--secondary"
        onClick={onEdit}
        title="Editar producto"
      >
        Editar
      </Button>
      <Button
        className="product-row-actions__button product-row-actions__button--danger"
        onClick={onDelete}
        title="Eliminar producto"
      >
        Eliminar
      </Button>
    </div>
  );
};

export default ProductRowActions;
