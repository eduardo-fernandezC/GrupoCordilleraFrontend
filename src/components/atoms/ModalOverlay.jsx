const ModalOverlay = ({ children, onClose }) => {
  return (
    <div className="logout-modal" role="presentation" onClick={onClose}>
      {children}
    </div>
  );
};

export default ModalOverlay;
