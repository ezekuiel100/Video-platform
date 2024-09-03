import { Navigate } from "react-router-dom";
import useAuthContext from "../AuthContext";

function ProtectedRoute({ element }) {
  const { user } = useAuthContext();

  return user ? element : <Navigate to='/login' />;
}

export default ProtectedRoute;
