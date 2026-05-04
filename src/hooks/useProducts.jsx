import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { auth0Config } from "../auth/authConfig";
import { getProducts } from "../services/productService";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: auth0Config.audience,
          },
        });
        const data = await getProducts(token);

        console.log("productos: " + data);
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Error cargando productos");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [getAccessTokenSilently, isAuthenticated]);

  return { products, loading, error };
};

export default useProducts;
