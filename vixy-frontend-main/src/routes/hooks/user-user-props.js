import {jwtDecode} from "jwt-decode";

// ----------------------------------------------------------------------

export function useUserProps() {
  return jwtDecode(localStorage.getItem("token"));;
}
