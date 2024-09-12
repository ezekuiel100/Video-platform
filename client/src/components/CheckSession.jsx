import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAuthContext from "../AuthContext";

function CheckSession() {
  const location = useLocation();
  const { setUser } = useAuthContext();

  useEffect(() => {
    fetch("https://13.58.63.58:3000/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.isAuthenticated === false) {
          return setUser(null);
        }
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
      });
  }, [location]);

  return <></>;
}

export default CheckSession;
