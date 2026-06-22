import Loader from "../../components/atoms/Loader";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import LandingTemplate from "../../components/templates/LandingTemplate";
import Text from "../../components/atoms/Text";
import UserTable from "../../components/organisms/UserTable";
import UserForm from "../../components/organisms/UserForm";
import Button from "../../components/atoms/Button";
import ConfirmModal from "../../components/organisms/ConfirmModal";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import { getRoles } from "../../auth/Roles";
import {
  notifyError,
  notifySuccess,
} from "../../services/NotificationService.js";
import "../../styles/pages/AdminUsersPage.css";
import { validateUserForm } from "../../validations/user.validation.js";
import SearchInput from "../../components/atoms/SearchInput";

const emptyForm = {
  name: "",
  email: "",
  password: "",
};

const AdminUsersPage = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const roles = getRoles(user);

  const {
    users,
    loading,
    error,

    page,
    setPage,
    totalPages,

    createUser,
    updateUser,
    deleteUser,

    searchQuery,
    setSearchQuery,
  } = useUsers();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated || !roles.includes("ADMIN")) {
    return <Navigate to="/unauthorized" replace />;
  }

  const totalUsers = users.length;
  const hasSearch = searchQuery.trim().length > 0;
  const handleCreate = () => {
    setEditingUser(null);
    setFormErrors({});
    setIsFormOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormErrors({});
    setIsFormOpen(true);
  };

  const handleSave = async (payload) => {
    const validationErrors = validateUserForm(payload, editingUser);

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      const normalizedPayload = {
        name: payload.name.trim(),

        email: payload.email.trim(),
      };

      if (payload.password?.trim()) {
        normalizedPayload.password = payload.password;
      }

      if (editingUser) {
        await updateUser(editingUser.user_id, normalizedPayload);

        notifySuccess("Usuario actualizado correctamente.");
      } else {
        await createUser({
          ...normalizedPayload,
          password: payload.password,
        });

        notifySuccess("Usuario creado correctamente.");
      }

      setIsFormOpen(false);

      setEditingUser(null);

      setFormErrors({});
    } catch (err) {
      setFormErrors({
        general: err.message || "Error al guardar",
      });
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.user_id);

      notifySuccess("Usuario eliminado correctamente.");

      setUserToDelete(null);
    } catch (err) {
      notifyError(`Error al eliminar: ${err.message}`);
    }
  };

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <LandingTemplate>
      <section className="admin-users-page">
        <div className="admin-users-page__hero">
          <div>
            <Text variant="p" className="admin-users-page__eyebrow">
              Gestión
            </Text>

            <Text variant="h1">Administrar Usuarios</Text>

            <Text variant="p" className="admin-users-page__intro">
              Crea, edita y elimina usuarios del sistema
            </Text>
          </div>

          <div className="admin-users-page__hero-actions">
            <div className="admin-users-page__summary-card">
              <Text variant="span" className="admin-users-page__summary-label">
                Total
              </Text>

              <Text variant="span" className="admin-users-page__summary-value">
                {totalUsers}
              </Text>
            </div>

            <Button text="Crear Usuario" onClick={handleCreate} />
          </div>
        </div>

        <div className="admin-users-page__table-card">
          <div className="admin-users-page__table-header">
            <Text variant="h2">Usuarios</Text>

            <div className="admin-users-page__search-wrap">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Buscar por nombre"
                ariaLabel="Buscar usuarios"
              />
            </div>
          </div>
          {/*esto lo puedo desglozar */}
          {users.length > 0 ? (
            <>
              <div className="admin-users-page__table-wrap">
                <UserTable
                  users={users}
                  onEdit={handleEdit}
                  onDelete={setUserToDelete}
                />
              </div>

              {!hasSearch && (
                <div className="pagination">
                  <Button
                    disabled={page === 0}
                    onClick={() => setPage((prev) => prev - 1)}
                  >
                    ←
                  </Button>

                  <span>
                    Pagina {page + 1} de {totalPages}
                  </span>

                  <Button
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    →
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Text variant="p" className="admin-users-page__empty-state">
              {hasSearch
                ? "No se encontraron usuarios con ese criterio"
                : "No hay usuarios registrados"}
            </Text>
          )}
        </div>
        {/*esto lo puedo desglozar */}

        {isFormOpen && (
          <div className="admin-users-page__modal">
            <div className="admin-users-page__dialog">
              <div className="admin-users-page__dialog-header">
                <Text variant="p" className="admin-users-page__dialog-eyebrow">
                  {editingUser ? "Editar" : "Crear"}
                </Text>

                <Text variant="h2">
                  {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
                </Text>
              </div>

              <UserForm
                user={editingUser || emptyForm}
                errors={formErrors}
                onSave={handleSave}
                onCancel={() => {
                  setIsFormOpen(false);

                  setEditingUser(null);

                  setFormErrors({});
                }}
              />
            </div>
          </div>
        )}

        <ConfirmModal
          isOpen={Boolean(userToDelete)}
          eyebrow="Eliminar Usuario"
          badgeSymbol="X"
          title={
            userToDelete ? `Borrar ${userToDelete.name}` : "Borrar usuario"
          }
          description={
            userToDelete
              ? `Esta accion eliminara el usuario ${userToDelete.name} de forma permanente.`
              : "Esta accion eliminara el usuario de forma permanente."
          }
          cancelLabel="Cancelar"
          confirmLabel="Eliminar"
          onCancel={() => setUserToDelete(null)}
          onConfirm={handleDelete}
        />
      </section>
    </LandingTemplate>
  );
};

export default AdminUsersPage;
