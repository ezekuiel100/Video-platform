import { Link, useNavigate } from "react-router-dom";
import useAuthContextToken from "../AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { setToken } = useAuthContextToken();

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
    })
      .then((res) => {
        if (res.ok) {
          navigate("/");
          return res.json();
        }
      })
      .then((data) => setToken(data.token));
  }

  return (
    <div className=" h-screen flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="bg-white w-[30rem] h-[32rem] flex flex-col gap-2 rounded-xl p-8 border border-gray-300 drop-shadow-md"
      >
        <h1 className="text-4xl font-semibold my-4">Login</h1>

        <div className="my-5 flex flex-col gap-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="border border-gray-200 rounded-lg outline-none p-3 text-sm focus:drop-shadow-md"
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            required
            className="border border-gray-200 rounded-lg outline-none p-3 text-sm focus:drop-shadow-md"
          />
        </div>

        <div className="my-5 flex flex-col gap-8">
          <a href="#">Forgot password?</a>
          <button className="bg-blue-600 p-3 text-white rounded-md hover:bg-blue-500 transition-all">
            Continue
          </button>

          <p className="text-center">
            New user?{" "}
            <Link to={"/register"} className="font-semibold">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
