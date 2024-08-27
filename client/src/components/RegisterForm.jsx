import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "./Button";

function RegisterForm({ onSubmit, error }) {
  return (
    <form
      className=' h-screen flex justify-center items-center'
      onSubmit={onSubmit}
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

          <Button>Continue</Button>

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

export default RegisterForm;
