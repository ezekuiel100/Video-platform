import { Link } from "react-router-dom";
import useAuthContext from "../AuthContext";
import NavMenu from "./NavMenu";

function Nav() {
  const { isAuthenticated, isLoading } = useAuthContext();

  return (
    <div className='bg-white p-2 drop-shadow-md flex justify-center relative mb-4 '>
      <input
        type='text'
        className='bg-gray-200 rounded-md w-72 outline-none py-1 px-2 text-sm '
      />
      {isLoading ? (
        ""
      ) : isAuthenticated ? (
        <div className='absolute right-10 inline-block'>
          <NavMenu />
        </div>
      ) : (
        <Link
          to={"/login"}
          className='bg-blue-200 px-4 absolute right-4 cursor-pointer text-sm py-1 rounded-md'
        >
          Login
        </Link>
      )}
    </div>
  );
}

export default Nav;
