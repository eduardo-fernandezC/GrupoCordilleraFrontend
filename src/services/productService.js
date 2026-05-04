import DataApi from "./api/DataApi";

export const getProducts = async (token) => {
  const response = await DataApi.get("/productos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
