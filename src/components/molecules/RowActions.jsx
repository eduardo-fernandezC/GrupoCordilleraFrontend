import Button from "../atoms/Button";
import "../../styles/components/molecules/RowActions.css";

const RowActions = ({ onEdit, onDelete }) => {
  return (
    <div className="row-actions">
      <Button
        className="row-actions__button row-actions__button--secondary"
        onClick={onEdit}
        title="Editar"
      >
        Editar
      </Button>
      <Button
        className="row-actions__button row-actions__button--danger"
        onClick={onDelete}
        title="Eliminar"
      >
        Eliminar
      </Button>
    </div>
  );
};

export default RowActions;