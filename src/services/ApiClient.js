import axios from "axios";

const ApiClient = axios.create({
  baseURL: "http://localhost:9000/api/dashboard/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiClient;
