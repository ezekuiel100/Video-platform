import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "./Button";

function LoginForm({ onSubmit, loginError }) {
  return (
    <form
      onSubmit={onSubmit}
      className='bg-[#151b23] w-[29rem] flex flex-col gap-2 rounded-xl p-6 px-8 border border-gray-600'
    >
      <h1 className='text-4xl font-semibold my-4 text-center'>Login</h1>

      <div className='mt-5 flex flex-col gap-6'>
        <Input type={"email"} name={"email"} placeholder={"Email"} />
        <Input type={"password"} name={"password"} placeholder={"Password"} />
      </div>

      {loginError && <span className='text-red-400'>{loginError}</span>}

      <div className='my-6 flex flex-col gap-4'>
        <a href='#'>
          Forgot password?
        </a>

        <Button>Continue</Button>

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
