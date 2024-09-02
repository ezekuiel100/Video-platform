import { Navigate } from "react-router-dom";
import useAuthContext from "../AuthContext";

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuthContext();
  return true ? element : <Navigate to='/login' />;
}

export default ProtectedRoute;
