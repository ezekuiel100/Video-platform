import { useNavigate } from "react-router-dom";
import useAuthContext from "../AuthContext";
import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  const { user, setUser } = useAuthContext();
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  async function handleLogin(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      const data = await res.json();

      if (data.isAuthenticated) {
        console.log(data);
        setUser(data.user);
        navigate("/");
      }
    } catch (error) {
      setLoginError(error.message);
    }
  }

  return (
    <div className=' h-screen flex justify-center items-center'>
      <LoginForm onSubmit={handleLogin} loginError={loginError} />
    </div>
  );
}

export default LoginPage;
