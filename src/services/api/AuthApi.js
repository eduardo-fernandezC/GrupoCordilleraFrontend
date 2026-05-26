import axios from "axios";

const AuthApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
});

export default AuthApi;