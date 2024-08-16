import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="bg-white p-2 drop-shadow-md flex justify-center mb-4 ">
      <input
        type="text"
        className="bg-gray-200 rounded-md w-72 outline-none py-1 px-2 text-sm "
      />
      <div className="bg-blue-200 px-4 absolute right-4 cursor-pointer text-sm py-1 rounded-md">
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
}

export default Nav;
