import { Navigate } from "react-router-dom";
import useAuthContext from "../AuthContext";

function GuestRoute({ element, path }) {
  const { user } = useAuthContext();

  if (!user) return;

  return user ? <Navigate to={path} /> : element;
}

export default GuestRoute;
