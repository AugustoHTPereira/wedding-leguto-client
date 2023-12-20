import axios from "axios";

const api = axios.create({
    baseURL: "https://cagui.somee.com/api"
})

const token = localStorage.getItem("leguto.identity.access_token");
if (!!token)
    api.defaults.headers["Authorization"] = `Bearer ${token}`;

export default api;