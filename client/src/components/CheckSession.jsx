import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAuthContext from "../AuthContext";

function CheckSession() {
  const location = useLocation();
  const { setUser } = useAuthContext();

  useEffect(() => {
    fetch("http://localhost:3000/auth/check-session", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.isAuthenticated) {
          setUser(null);
          localStorage.removeItem("user_data");
        }
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem("user_data");
      });
  }, [location]);
  return <></>;
}

export default CheckSession;
