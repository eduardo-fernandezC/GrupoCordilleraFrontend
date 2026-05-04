import Loader from "../components/atoms/Loader";
import ErrorMessage from "../components/atoms/ErrorMessage";
import useProducts from "../hooks/useProducts";
import LandingTemplate from "../components/templates/LandingTemplate";

const AdminProductsPage = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <LandingTemplate>
      <div>
        <h1> Gestion de productos</h1>
        <div>
          <pre>{JSON.stringify(products, null, 2)}</pre>
        </div>
      </div>
    </LandingTemplate>
  );
};

export default AdminProductsPage;
