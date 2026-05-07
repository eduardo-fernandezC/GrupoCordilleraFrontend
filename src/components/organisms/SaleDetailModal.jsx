import ModalOverlay from "../atoms/ModalOverlay";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import { formatCurrency } from "../../services/salesReportService";

const SaleDetailModal = ({
  isOpen,
  selectedVenta,
  ventaDetalle,
  loading,
  error,
  onClose,
}) => {
  if (!isOpen || !selectedVenta) {
    return null;
  }

  const activeVenta = ventaDetalle || selectedVenta;

  return (
    <ModalOverlay onClose={onClose}>
      <div
        className="sales-report-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sales-report-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sales-report-modal__header">
          <div>
            <Text variant="p" className="sales-report-modal__eyebrow">
              Venta {activeVenta.idVenta}
            </Text>
            <Text variant="h2" id="sales-report-modal-title">
              Detalle de la venta
            </Text>
            <Text variant="p" className="sales-report-modal__subtitle">
              {ventaDetalle?.fecha
                ? `Fecha: ${ventaDetalle.fecha}`
                : "Detalle solicitado al backend"}
            </Text>
          </div>

          <Button
            text="Cerrar"
            onClick={onClose}
            className="sales-report-modal__close"
          />
        </div>

        <div className="sales-report-modal__summary">
          <Text variant="p">Total: {formatCurrency(activeVenta.total)}</Text>
          <Text variant="p">
            Productos:{" "}
            {ventaDetalle?.productos?.length ||
              activeVenta.cantidadDetalles ||
              0}
          </Text>
        </div>

        {loading ? (
          <Text variant="p" className="sales-report-modal__state">
            Cargando detalle...
          </Text>
        ) : error ? (
          <Text
            variant="p"
            className="sales-report-modal__state sales-report-modal__state--error"
          >
            {error}
          </Text>
        ) : (
          <div className="sales-report-modal__products">
            {ventaDetalle.productos?.map((producto) => (
              <article
                key={producto.idDetalle}
                className="sales-report-product"
              >
                <div>
                  <Text variant="h3" className="sales-report-product__title">
                    {producto.nombreProducto}
                  </Text>
                  <Text variant="p" className="sales-report-product__meta">
                    {producto.categoria}
                  </Text>
                </div>

                <div className="sales-report-product__grid">
                  <Text variant="p">
                    Precio: {formatCurrency(producto.precio)}
                  </Text>
                  <Text variant="p">Cantidad: {producto.cantidad}</Text>
                  <Text variant="p">
                    Subtotal: {formatCurrency(producto.subtotal)}
                  </Text>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </ModalOverlay>
  );
};

export default SaleDetailModal;
