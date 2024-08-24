import { Link } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import useAuthContext from "../AuthContext";

function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsAuthenticated } = useAuthContext();

  function SignOut() {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Logout successful") {
          setIsAuthenticated(false);
          localStorage.removeItem("user_data");
          window.location.href = "http://localhost:5173/";
        }
      })
      .catch((error) => console.log(error));
  }

  function handleToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className='flex relative gap-4 items-center'>
      <Link to={"/sendvideo"}>
        <VideoCameraIcon className='size-6 cursor-pointer' />
      </Link>
      <ProfileImage onToggle={handleToggle} />

      <div
        onClick={SignOut}
        className={`bg-blue-300 absolute right-0 top-full p-1 px-2 cursor-pointer  ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        SignOut
      </div>
    </div>
  );
}

export default NavMenu;
