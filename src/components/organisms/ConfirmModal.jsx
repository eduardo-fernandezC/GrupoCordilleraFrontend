import ModalOverlay from "../atoms/ModalOverlay";
import ModalBadge from "../atoms/ModalBadge";
import ModalActions from "../molecules/ModalActions";

const ConfirmModal = ({ isOpen, title, description, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClose={onCancel}>
      <div
        className="logout-modal__dialog"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="logout-modal__header">
          <ModalBadge />

          <div>
            <p className="logout-modal__eyebrow">Confirmacion</p>
            <h3 className="logout-modal__title">{title}</h3>
          </div>
        </div>

        <p className="logout-modal__text">{description}</p>

        <ModalActions onCancel={onCancel} onConfirm={onConfirm} />
      </div>
    </ModalOverlay>
  );
};

export default ConfirmModal;
