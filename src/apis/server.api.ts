import axios from "axios";

const homeUrl = "http://localhost:3000";

export const serverAPI = axios.create({
  baseURL: homeUrl,
});
