import axios from "axios";

const api = axios.create({
  baseURL: "https://api-panel.berimcafe.org/v1",
});

export default api;
