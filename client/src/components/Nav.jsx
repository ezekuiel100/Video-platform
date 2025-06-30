import { Link } from "react-router-dom";
import useAuthContext from "../AuthContext";
import NavMenu from "./NavMenu";
import { Search } from "lucide-react"

function Nav() {
  const { user } = useAuthContext();

  return (
    <div className='p-2 px-4 drop-shadow-md flex justify-between items-center mb-4'>
      <Link to={"/"}>Home</Link>
      <div className="relative">
        <Search className="absolute top-2 left-2 text-gray-300 size-5" />
        <input
          type='text'
          className='bg-stone-950 rounded-3xl w-96 py-2 outline-none px-4 pl-9 text-sm text-white'
          placeholder="Search"
        />
      </div>
      {user ? (
        <div className='inline-block'>
          <NavMenu />
        </div>
      ) : (
        <Link
          to={"/login"}
          className='ring-[0.3px] ring-gray-300 px-4 cursor-pointer text-sm py-1 rounded-full hover:bg-[#2b2a2a] hover:ring-0'
        >
          Login
        </Link>
      )}
    </div>
  );
}

export default Nav;
