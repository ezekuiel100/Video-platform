function LoginPage() {
  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="bg-white w-[30rem] h-[32rem] flex flex-col gap-2 rounded-xl p-8 border border-gray-300 drop-shadow-md">
        <h1 className="text-4xl font-semibold my-4">Login</h1>

        <div className="my-5 flex flex-col gap-6">
          <input
            type="email"
            name=""
            id=""
            className="border border-gray-200 rounded-lg outline-none p-3 text-sm focus:drop-shadow-md"
          />

          <input
            type="password"
            name=""
            id=""
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
            <a href="#" className="font-semibold">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
