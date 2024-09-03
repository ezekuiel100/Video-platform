import { useContext } from "react";
import { AuthContext } from "./App";

function useAuthContext() {
  const { setUser, user } = useContext(AuthContext);

  return {
    setUser,
    user,
  };
}

export default useAuthContext;
