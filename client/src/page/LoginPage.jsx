import { useNavigate } from "react-router-dom";
import useAuthContext from "../AuthContext";
import { useEffect } from "react";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

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
          setUser(data.user);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div className=' h-screen flex justify-center items-center'>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}

export default LoginPage;
