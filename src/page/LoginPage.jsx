import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../AuthContext";
import { useEffect } from "react";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  function handleLogin(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isAuthenticated) {
          localStorage.setItem("user_data", JSON.stringify(data.user));
          setUser(data.user);
          setIsAuthenticated(data.isAuthenticated);
          navigate("/");
        }
      });
  }

  return (
    <div className=' h-screen flex justify-center items-center'>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}

export default LoginPage;
