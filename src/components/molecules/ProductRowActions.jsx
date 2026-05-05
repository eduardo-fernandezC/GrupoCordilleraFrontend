import "../../styles/components/molecules/ProductRowActions.css";

const ProductRowActions = ({ onEdit, onDelete }) => {
  return (
    <div className="product-row-actions">
      <button
        className="product-row-actions__button product-row-actions__button--secondary"
        onClick={onEdit}
        title="Editar producto"
      >
        Editar
      </button>
      <button
        className="product-row-actions__button product-row-actions__button--danger"
        onClick={onDelete}
        title="Eliminar producto"
      >
        Eliminar
      </button>
    </div>
  );
};

export default ProductRowActions;
