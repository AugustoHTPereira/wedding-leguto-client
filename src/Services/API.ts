import axios from "axios";
import { parseCookies } from "nookies";

const api = axios.create({
    baseURL: "https://leguto.somee.com/api"
})

const token = localStorage.getItem("leguto.identity.access_token");
if (!!token)
    api.defaults.headers["Authorization"] = `Bearer ${token}`;

export default api;