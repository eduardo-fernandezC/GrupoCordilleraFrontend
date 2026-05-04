import Button from "../atoms/Button";

const ModalActions = ({ onCancel, onConfirm }) => {
  return (
    <div className="logout-modal__actions">
      <button
        type="button"
        className="logout-modal__button logout-modal__button--secondary"
        onClick={onCancel}
      >
        Cancelar
      </button>

      <Button
        text="Si, salir"
        onClick={onConfirm}
        className="logout-modal__button logout-modal__button--danger"
      />
    </div>
  );
};

export default ModalActions;
