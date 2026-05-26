import Loader from "../../components/atoms/Loader";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import LandingTemplate from "../../components/templates/LandingTemplate";
import Text from "../../components/atoms/Text";
import UserTable from "../../components/organisms/UserTable";
import useUsers from "../../hooks/useUsers";

const AdminUsersPage = () => {
  const { users, loading, error } = useUsers();
  if (loading) return <Loader />;
  if (error) {
    return (
      <ErrorMessage message={error} />
    );
  }

  return (
    <LandingTemplate>
      <section className="admin-users-page">
        {/* Hero Section */}
        <div className="admin-users-page__hero">
          <div>
            <Text
              variant="p"
              className="admin-users-page__eyebrow"
            >
              Gestión
            </Text>
            <Text variant="h1">
              Administrar Usuarios
            </Text>

            <Text
              variant="p"
              className="admin-users-page__intro"
            >
              Visualiza los usuarios registrados en la plataforma
            </Text>
          </div>
        </div>

        {/* Table Section */}
        <div className="admin-users-page__table-card">
          <div className="admin-users-page__table-header">
            <Text variant="h2">
              Usuarios
            </Text>
          </div>

          <div className="admin-users-page__table-wrap">
            <UserTable users={users} />
          </div>
        </div>
      </section>

    </LandingTemplate>
  );
};

export default AdminUsersPage;