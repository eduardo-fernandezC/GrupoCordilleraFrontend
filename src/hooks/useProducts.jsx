import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import { auth0Config } from "../auth/authConfig";
import {
  createProduct as createProductRequest,
  deleteProduct as deleteProductRequest,
  getProducts,
  updateProduct as updateProductRequest,
} from "../services/productService";

const normalizeProducts = (value) => (Array.isArray(value) ? value : []);

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const getAuthenticatedToken = useCallback(async () => {
    return getAccessTokenSilently({
      authorizationParams: {
        audience: auth0Config.audience,
      },
    });
  }, [getAccessTokenSilently]);

  const loadProducts = useCallback(async () => {
    // usamos useCallback para memorizar la funcion y evitar recrearla en cada renderizado y asi evitar bucles infinitos en useEffect
    if (!isAuthenticated) {
      setProducts([]);
      setLoading(false);
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      const token = await getAuthenticatedToken();
      const data = await getProducts(token);
      const normalizedProducts = normalizeProducts(data);

      setProducts(normalizedProducts);

      return normalizedProducts;
    } catch {
      setError("Error cargando productos");
      return [];
    } finally {
      setLoading(false);
    }
  }, [getAuthenticatedToken, isAuthenticated]);

  useEffect(() => {
    queueMicrotask(() => {
      void loadProducts();
    });
  }, [loadProducts]);

  const createProduct = useCallback(
    async (product) => {
      const token = await getAuthenticatedToken();
      await createProductRequest(token, product);
      await loadProducts();
    },
    [getAuthenticatedToken, loadProducts],
  );

  const updateProduct = useCallback(
    async (productId, product) => {
      const token = await getAuthenticatedToken();
      await updateProductRequest(token, productId, product);
      await loadProducts();
    },
    [getAuthenticatedToken, loadProducts],
  );

  const deleteProduct = useCallback(
    async (productId) => {
      const token = await getAuthenticatedToken();
      await deleteProductRequest(token, productId);
      await loadProducts();
    },
    [getAuthenticatedToken, loadProducts],
  );

  return {
    products,
    loading,
    error,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;
