import { Navigate } from "react-router-dom";
import useAuthContext from "../AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuthContext();

  if (user === undefined) return;

  if (user === false) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
}

export default ProtectedRoute;
