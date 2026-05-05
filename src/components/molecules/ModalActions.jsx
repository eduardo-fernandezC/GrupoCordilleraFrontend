import Button from "../atoms/Button";
import "../../styles/components/molecules/ModalActions.css";

const ModalActions = ({
  onCancel,
  onConfirm,
  cancelLabel = "Cancelar",
  confirmLabel = "Si, salir",
}) => {
  return (
    <div className="logout-modal__actions">
      <button
        type="button"
        className="logout-modal__button logout-modal__button--secondary"
        onClick={onCancel}
      >
        {cancelLabel}
      </button>

      <Button
        text={confirmLabel}
        onClick={onConfirm}
        className="logout-modal__button logout-modal__button--danger"
      />
    </div>
  );
};

export default ModalActions;
