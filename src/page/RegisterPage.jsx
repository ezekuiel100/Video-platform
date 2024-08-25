import { useState } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

function RegisterPage(e) {
  const [error, setError] = useState(null);

  function handleRegister(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const profilePic = "src/image/profile.jpg";

    if (password != confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, profilePic }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => setError(error.error));
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    setError(null);
  }

  return <RegisterForm onSubmit={handleRegister} error={error} />;
}

export default RegisterPage;
