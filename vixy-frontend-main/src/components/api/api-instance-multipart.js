import axios from "axios"; 

import { getToken } from "src/sections/user/utils";

const instanceMultipart = axios.create({
  baseURL : 'http://localhost:4000/api/',
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "multipart/form-data",
        // Content-Type: "",
        // timeout : 1000,
  }, 
  // .. other options
});

export default instanceMultipart;