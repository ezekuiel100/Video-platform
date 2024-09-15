import { Navigate } from "react-router-dom";
import useAuthContext from "../AuthContext";

function ProtectedRoute({ element, path }) {
  const { user } = useAuthContext();

  if (user == undefined) return;

  return user ? element : <Navigate to={path} />;
}

export default ProtectedRoute;
