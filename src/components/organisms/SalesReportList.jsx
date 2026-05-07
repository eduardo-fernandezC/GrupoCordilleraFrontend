import Text from "../atoms/Text";
import Button from "../atoms/Button";
import { formatCurrency } from "../../services/salesReportService";

const SalesReportList = ({ ventas, selectedVentaId, onSelectVenta }) => {
  return (
    <div
      className="sales-report-list"
      role="list"
      aria-label="Listado de ventas"
    >
      {ventas.map((venta) => {
        const isSelected = venta.idVenta === selectedVentaId;

        return (
          <article
            key={venta.idVenta}
            className={`sales-report-card${isSelected ? " sales-report-card--selected" : ""}`}
            role="listitem"
          >
            <div className="sales-report-card__header">
              <div>
                <Text variant="p" className="sales-report-card__eyebrow">
                  Venta {venta.idVenta}
                </Text>
              </div>

              <Text variant="span" className="sales-report-card__total">
                {formatCurrency(venta.total)}
              </Text>
            </div>

            <div className="sales-report-card__actions">
              <Button
                text={isSelected ? "Detalle abierto" : "Ver detalle"}
                onClick={() => onSelectVenta(venta.idVenta)}
                className={
                  isSelected
                    ? "sales-report-card__button sales-report-card__button--active"
                    : "sales-report-card__button"
                }
              />
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default SalesReportList;
