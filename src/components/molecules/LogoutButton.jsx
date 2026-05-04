// LogoutButton.jsx
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../atoms/Button";
import ConfirmModal from "../organisms/ConfirmModal";
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

  const executeLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
      federated: true,
    });
  };

  const handleOpenModal = () => {
    if (hasAssignedRole) {
      setIsModalOpen(true);
      return;
    }

    executeLogout();
  };

  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    executeLogout();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button text="CERRAR SESION" onClick={handleOpenModal} />

      <ConfirmModal
        isOpen={isModalOpen}
        title="Cerrar sesion"
        description="Vas a salir de tu sesion actual. Si continuas, volveras al inicio."
        eyebrow="Confirmacion"
        badgeSymbol="!"
        confirmText="Si, salir"
        cancelText="Cancelar"
        onCancel={handleCancel}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default LogoutButton;
