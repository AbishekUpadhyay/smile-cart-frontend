import { keysToCamelCase } from "@bigbinary/neeto-cist";
import axios from "axios";

const transformResponseKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

//setting up response interceptors
const responseInterceptors = () => {
  axios.interceptors.response.use(response => {
    transformResponseKeysToCamelCase(response);

    return response.data;
  });
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json", //tells server what data we are accepting
    "Content-Type": "application/json", //tells the sever what data format we are sending in request body
  };
};

const initializeAxios = () => {
  axios.defaults.baseURL =
    "https://smile-cart-backend-staging.neetodeployapp.com/";
  setHttpHeaders();
  responseInterceptors();
};
export default initializeAxios;
