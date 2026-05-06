import ModalOverlay from "../atoms/ModalOverlay";
import ModalBadge from "../atoms/ModalBadge";
import ModalActions from "../molecules/ModalActions";
import Text from "../atoms/Text";
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
            <Text variant="p" className="logout-modal__eyebrow">{eyebrow}</Text>
            <Text variant="h3" className="logout-modal__title">{title}</Text>
          </div>
        </div>

        <Text variant="p" className="logout-modal__text">{description}</Text>

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
