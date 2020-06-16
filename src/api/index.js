import axios from "axios";

const API = axios.create({
  baseURL: "https://likewater-internal.azurewebsites.net/api",
});

export default API;
