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
        console.log(data);
        if (!data.isAuthenticated) {
          setUser(null);
        }
      })
      .catch(() => {
        setUser(null);
      });
  }, [location]);

  return <></>;
}

export default CheckSession;
