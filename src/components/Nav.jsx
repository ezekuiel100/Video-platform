import { Link } from "react-router-dom";
import useAuthContext from "../AuthContext";

function Nav() {
  const { user } = useAuthContext();
  console.log(user)

  return (
    <div className="bg-white p-2 drop-shadow-md flex justify-center mb-4 ">
      <input
        type="text"
        className="bg-gray-200 rounded-md w-72 outline-none py-1 px-2 text-sm "
      />
     {user ? user.name : <Link
        to={"/login"}
        className="bg-blue-200 px-4 absolute right-4 cursor-pointer text-sm py-1 rounded-md"
      >
        Login
      </Link>}
    </div>
  );
}

export default Nav;
