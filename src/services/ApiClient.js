import axios from "axios";

const ApiClient = axios.create({
  baseURL: "http://localhost:9000/dashboard/data/api/v1/", // <-- nose si esta bien esta ruta
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiClient;
