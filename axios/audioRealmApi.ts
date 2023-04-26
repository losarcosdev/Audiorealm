import axios from "axios";

const audioRealmApi = axios.create({ baseURL: "/api" });

export default audioRealmApi;
