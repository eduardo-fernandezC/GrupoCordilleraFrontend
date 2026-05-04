const ModalBadge = ({ symbol = "!" }) => {
  return (
    <div className="logout-modal__badge" aria-hidden="true">
      {symbol}
    </div>
  );
};

export default ModalBadge;
