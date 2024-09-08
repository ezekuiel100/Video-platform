import { Navigate } from "react-router-dom";
import useAuthContext from "../AuthContext";

function ProtectedRoute({ element, path }) {
  const { user } = useAuthContext();

  return user ? element : <Navigate to={path} />;
}

export default ProtectedRoute;
