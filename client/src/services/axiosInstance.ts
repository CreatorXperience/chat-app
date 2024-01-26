import axios from "axios";
import { DEFAULT_URL } from "../constants/endpoints";

const axiosInstance = axios.create({
    baseURL: `${DEFAULT_URL}`,
})

export default axiosInstance