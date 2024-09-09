import { Navigate } from "react-router-dom";
import useAuthContext from "../AuthContext";

function GuestRoute({ element, path }) {
  const { user } = useAuthContext();

  return user ? <Navigate to={path} /> : element;
}

export default GuestRoute;
