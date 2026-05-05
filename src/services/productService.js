import DataApi from "./api/DataApi";

const buildAuthConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const dataBaseUrl = (import.meta.env.VITE_DATA_URL ?? "").trim();
const normalizedDataBaseUrl = dataBaseUrl.replace(/\/+$/, "");

const productsBaseUrl = normalizedDataBaseUrl.endsWith("/productos")
  ? normalizedDataBaseUrl
  : `${normalizedDataBaseUrl}/productos`;

const productItemUrl = (productId) =>
  `${productsBaseUrl}/${encodeURIComponent(productId)}`;

export const getProducts = async (token) => {
  const response = await DataApi.get(productsBaseUrl, buildAuthConfig(token));

  return response.data;
};

export const createProduct = async (token, product) => {
  const response = await DataApi.post(
    productsBaseUrl,
    product,
    buildAuthConfig(token),
  );

  return response.data;
};

export const updateProduct = async (token, productId, product) => {
  const response = await DataApi.put(
    productItemUrl(productId),
    product,
    buildAuthConfig(token),
  );

  return response.data;
};

export const deleteProduct = async (token, productId) => {
  const response = await DataApi.delete(
    productItemUrl(productId),
    buildAuthConfig(token),
  );

  return response.data;
};
