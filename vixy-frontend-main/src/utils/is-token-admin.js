import {jwtDecode} from "jwt-decode";

const isTokenAdmin = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const decodedToken = jwtDecode(token);
  if(decodedToken.role !== 'KASIR'){
    return true
  }
  return false;
};

export default isTokenAdmin;