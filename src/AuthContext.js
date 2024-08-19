import { useContext } from "react";
import { AuthContext } from "./App";

function useAuthContextToken() {
  const { token, setToken } = useContext(AuthContext);

  return { token, setToken };
}

export default useAuthContextToken;
