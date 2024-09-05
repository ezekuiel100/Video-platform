import { useEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

function RegisterPage(e) {
  const [formData, setFormData] = useState(null);
  const [isSumitted, setIsSumitted] = useState(false);
  const { data, error, fetchData } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(isSumitted ? "http://localhost:3000/register" : null, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  }, []);

  function handleRegister(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const profilePic = "/src/image/profile.jpg";

    setFormData({ name, email, password, confirmPassword, profilePic });
    setIsSumitted(true);
  }

  useEffect(() => {
    if (data) {
      navigate("/login");
    }
  }, [data]);

  return <RegisterForm onSubmit={handleRegister} error={error} />;
}

export default RegisterPage;
