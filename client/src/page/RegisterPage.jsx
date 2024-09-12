import { useEffect, useLayoutEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

function RegisterPage(e) {
  const [formData, setFormData] = useState(null);
  const { data, error, fetchData } = useFetch(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (formData) {
      fetchData("http://13.58.63.58:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
    }
  }, [formData]);

  function handleRegister(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    setFormData({ name, email, password, confirmPassword });
  }

  useEffect(() => {
    if (data) {
      navigate("/login");
    }
  }, [data]);

  return <RegisterForm onSubmit={handleRegister} error={error} />;
}

export default RegisterPage;
