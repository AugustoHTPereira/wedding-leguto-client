import axios from "axios";
import { parseCookies } from "nookies";

const api = axios.create({
    baseURL: "https://leguto.somee.com/api"
})

const { 'leguto.identity.access_token': token } = parseCookies(undefined);
if (!!token)
    api.defaults.headers["Authorization"] = `Bearer ${token}`;

export default api;