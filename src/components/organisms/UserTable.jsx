import ErrorMessage from "../atoms/ErrorMessage";

import "../../styles/components/organisms/UserTable.css";

const UserTable = ({ users }) => {
  if (!users.length) {
    return (
      <ErrorMessage message="No hay usuarios registrados." />
    );
  }

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Nombre</th>
          <th>Nickname</th>
          <th>Logins</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.user_id}>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>{user.nickname}</td>
            <td>{user.logins_count}</td>
          </tr>

        ))}
      </tbody>
    </table>
  );
};

export default UserTable;