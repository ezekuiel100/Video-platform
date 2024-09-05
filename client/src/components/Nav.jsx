import { Link } from "react-router-dom";
import useAuthContext from "../AuthContext";
import NavMenu from "./NavMenu";

function Nav() {
  const { user } = useAuthContext();

  return (
    <div className='bg-white p-2 px-4 drop-shadow-md flex justify-between  mb-4 '>
      <Link to={"/"}>Home</Link>
      <input
        type='text'
        className='bg-gray-200 rounded-2xl w-72 outline-none py-1 px-2 text-sm '
      />
      {user ? (
        <div className=' inline-block'>
          <NavMenu />
        </div>
      ) : (
        <Link
          to={"/login"}
          className='bg-blue-200 px-4  cursor-pointer text-sm py-1 rounded-md'
        >
          Login
        </Link>
      )}
    </div>
  );
}

export default Nav;
