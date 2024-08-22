import { Link } from "react-router-dom";
import useAuthContext from "../AuthContext";
import ProfileImage from "./ProfileImage";
import { useState } from "react";

function Nav() {
  const { isAuthenticated, setIsAuthenticated } = useAuthContext(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isLoading } = useAuthContext();

  function handleToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  function SignOut() {
    console.log("signout");
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Logout successful") {
          setIsAuthenticated(false);

          window.location.reload();
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className='bg-white p-2 drop-shadow-md flex justify-center relative mb-4 '>
      <input
        type='text'
        className='bg-gray-200 rounded-md w-72 outline-none py-1 px-2 text-sm '
      />
      {isLoading ? (
        ""
      ) : isAuthenticated ? (
        <div className='absolute right-10 inline-block' onClick={handleToggle}>
          <ProfileImage />

          <div
            onClick={SignOut}
            className={`bg-blue-300 absolute right-0 top-full p-1 px-2 cursor-pointer  ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            SignOut
          </div>
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
