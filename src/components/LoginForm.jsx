import { Link } from "react-router-dom";
import Input from "../components/Input";

function LoginForm({ onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className='bg-white w-[30rem] h-[32rem] flex flex-col gap-2 rounded-xl p-8 border border-gray-300 drop-shadow-md'
    >
      <h1 className='text-4xl font-semibold my-4'>Login</h1>

      <div className='my-5 flex flex-col gap-6'>
        <Input type={"email"} name={"email"} placeholder={"Email"} />
        <Input type={"password"} name={"password"} placeholder={"Password"} />
      </div>

      <div className='my-5 flex flex-col gap-8'>
        <a href='#'>Forgot password?</a>
        <button className='bg-blue-600 p-3 text-white rounded-md hover:bg-blue-500 transition-all'>
          Continue
        </button>

        <p className='text-center'>
          New user?{" "}
          <Link to={"/register"} className='font-semibold'>
            Register
          </Link>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
