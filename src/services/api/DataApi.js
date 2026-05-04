import axios from "axios";

const DataApi = axios.create({
  baseURL: import.meta.env.VITE_DATA_URL,
});

export default DataApi;
