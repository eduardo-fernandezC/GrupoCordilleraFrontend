import { useState } from "react";
import RowActions from "../molecules/RowActions";
import "../../styles/components/organisms/CrudTable.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const UserTable = ({ users, onEdit, onDelete }) => {
  if (!users.length) return null;

  const [visibleIds, setVisibleIds] = useState(new Set()); // new Set es para evitar duplicados y facilitar la eliminacion de ids

  const toggleIdVisibility = (id) => {
    setVisibleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <table className="crud-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Nombre</th>
          <th>Roles</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          const id = user.user_id ?? null;
          const isVisible = id ? visibleIds.has(id) : false;

          return (
            <tr key={id ?? user.email}>
              <td className="user-id-cell">
                {id ? (
                  <>
                    {isVisible && <span className="user-id">{id}</span>}

                    <button
                      type="button"
                      className="id-toggle-btn"
                      onClick={() => toggleIdVisibility(id)}
                      aria-label={isVisible ? "Ocultar id" : "Mostrar id"}
                    >
                      {isVisible ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </>
                ) : (
                  "-"
                )}
              </td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.roles?.length ? user.roles.join(", ") : ""}</td>
              <td>
                <RowActions
                  onEdit={() => onEdit(user)}
                  onDelete={() => onDelete(user)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
