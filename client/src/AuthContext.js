import { useContext } from "react";
import { AuthContext } from "./App";

function useAuthContext() {
  const { setUser, user, isAuthenticated, setIsAuthenticated, isLoading } =
    useContext(AuthContext);

  return {
    setUser,
    user,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
  };
}

export default useAuthContext;
