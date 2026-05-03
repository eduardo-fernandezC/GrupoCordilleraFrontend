import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../atoms/Button";
import { getRoles } from "../../auth/Roles";
import "../../styles/components/molecules/LogoutButton.css";

const LogoutButton = () => {
  const { logout, user } = useAuth0();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const roles = getRoles(user);
  const hasAssignedRole = roles.includes("ADMIN") || roles.includes("ANALISTA");

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.body.classList.add("logout-modal-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("logout-modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const handleOpenModal = () => {
    if (hasAssignedRole) {
      setIsModalOpen(true);
      return;
    }

    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
      federated: true,
    });
  };

  const handleConfirmLogout = () => {
    setIsModalOpen(false);

    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
      federated: true,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button text="CERRAR SESION" onClick={handleOpenModal} />

      {isModalOpen && (
        <div
          className="logout-modal"
          role="presentation"
          onClick={handleCancel}
        >
          <div
            className="logout-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-modal-title"
            aria-describedby="logout-modal-description"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="logout-modal__header">
              <div className="logout-modal__badge" aria-hidden="true">
                !
              </div>
              <div>
                <p className="logout-modal__eyebrow">Confirmacion</p>
                <h3 id="logout-modal-title" className="logout-modal__title">
                  Cerrar sesion
                </h3>
              </div>
            </div>

            <p id="logout-modal-description" className="logout-modal__text">
              Vas a salir de tu sesion actual. Si continuas, volveras al inicio.
            </p>

            <div className="logout-modal__actions">
              <button
                type="button"
                className="logout-modal__button logout-modal__button--secondary"
                onClick={handleCancel}
              >
                Cancelar
              </button>

              <Button
                text="Si, salir"
                onClick={handleConfirmLogout}
                className="logout-modal__button logout-modal__button--danger"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
