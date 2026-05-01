import axios from "axios";

const ApiClient = axios.create({
  baseURL: "${BASE_URL}",
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiClient;
