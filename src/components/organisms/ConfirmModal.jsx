import ModalOverlay from "../atoms/ModalOverlay";
import ModalBadge from "../atoms/ModalBadge";
import ModalActions from "../molecules/ModalActions";
import "../../styles/components/organisms/ConfirmModal.css";

const ConfirmModal = ({
  isOpen,
  title,
  description,
  onCancel,
  onConfirm,
  eyebrow = "Confirmacion",
  badgeSymbol = "!",
  cancelLabel,
  confirmLabel,
}) => {
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
          <ModalBadge symbol={badgeSymbol} />

          <div>
            <p className="logout-modal__eyebrow">{eyebrow}</p>
            <h3 className="logout-modal__title">{title}</h3>
          </div>
        </div>

        <p className="logout-modal__text">{description}</p>

        <ModalActions
          onCancel={onCancel}
          onConfirm={onConfirm}
          cancelLabel={cancelLabel}
          confirmLabel={confirmLabel}
        />
      </div>
    </ModalOverlay>
  );
};

export default ConfirmModal;
