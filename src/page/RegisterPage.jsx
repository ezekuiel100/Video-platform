import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";

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

  return (
    <form
      className=' h-screen flex justify-center items-center'
      onSubmit={handleRegister}
    >
      <div className='bg-white w-[30rem]  flex flex-col gap-2 rounded-xl p-8 border border-gray-300 drop-shadow-md'>
        <h1 className='text-4xl font-semibold my-4'>Register</h1>

        <div className='my-5 flex flex-col gap-6'>
          <Input type={"text"} name='name' placeholder={"Name"} />
          <Input type={"email"} name='email' placeholder={"Email"} />
          <Input type={"password"} name='password' placeholder={"Password"} />

          <div className='flex flex-col'>
            <Input
              type={"password"}
              name='confirmPassword'
              placeholder={"Confirm Password"}
            />

            {error && <span className='text-red-400'>{error}</span>}
          </div>
        </div>

        <div className='my-5 flex flex-col gap-8'>
          <div className='flex gap-2 items-center'>
            <input
              type='checkbox'
              name='acceptTerms'
              className='w-4 h-4'
              required
            />
            <p>Agree to Our terms and Conditions</p>
          </div>

          <button className='bg-blue-600 p-3 text-white rounded-md hover:bg-blue-500 transition-all'>
            Continue
          </button>
          <p className='text-center'>
            Already registered?{" "}
            <Link to={"/login"} className='font-semibold'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}

export default RegisterPage;
