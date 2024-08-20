import { useContext } from "react";
import { AuthContext } from "./App";

function useAuthContext() {
  const { token, setToken, setUser, user } = useContext(AuthContext);

  return { token, setToken, setUser, user };
}

export default useAuthContext;
