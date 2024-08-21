import { useContext } from "react";
import { AuthContext } from "./App";

function useAuthContext() {
  const {
    token,
    setToken,
    setUser,
    user,
    isAuthenticated,
    setIsAuthenticated,
  } = useContext(AuthContext);

  return {
    token,
    setToken,
    setUser,
    user,
    isAuthenticated,
    setIsAuthenticated,
  };
}

export default useAuthContext;
