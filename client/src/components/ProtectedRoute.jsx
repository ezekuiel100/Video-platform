import { Navigate, useNavigate } from "react-router-dom";
import useAuthContext from "../AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ element }) {
  const { user } = useAuthContext();

  return user ? element : <Navigate to='/login' />;
}

export default ProtectedRoute;
