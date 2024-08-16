import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="bg-white w-[30rem]  flex flex-col gap-2 rounded-xl p-8 border border-gray-300 drop-shadow-md">
        <h1 className="text-4xl font-semibold my-4">Register</h1>

        <div className="my-5 flex flex-col gap-6">
          <input
            type="text"
            name=""
            placeholder="Name"
            className="border border-gray-200 rounded-lg outline-none p-3 text-sm focus:drop-shadow-md"
          />
          <input
            type="email"
            name=""
            placeholder="Email"
            className="border border-gray-200 rounded-lg outline-none p-3 text-sm focus:drop-shadow-md"
          />

          <input
            type="password"
            name=""
            placeholder="Password"
            className="border border-gray-200 rounded-lg outline-none p-3 text-sm focus:drop-shadow-md"
          />
        </div>

        <div className="my-5 flex flex-col gap-8">
          <div className="flex gap-2 items-center">
            <input type="checkbox" name="" id="" className="w-4 h-4" />
            <p>Agree to Our terms and Conditions</p>
          </div>

          <button className="bg-blue-600 p-3 text-white rounded-md hover:bg-blue-500 transition-all">
            Continue
          </button>
          <p className="text-center">
            Already registered?{" "}
            <Link to={"/login"} className="font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
