import Button from "../atoms/Button";

const ProductRowActions = ({ onEdit, onDelete }) => {
  return (
    <div>
      <Button text="Editar" onClick={onEdit} />
      <Button text="Eliminar" onClick={onDelete} />
    </div>
  );
};

export default ProductRowActions;
