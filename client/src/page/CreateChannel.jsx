import { CameraIcon } from "@heroicons/react/24/outline";
import Input from "../components/Input";
import Button from "../components/Button";
import useFetch from "../hooks/useFetch";
import Nav from "../components/Nav";
import useAuthContext from "../AuthContext";
import { useState } from "react";

function CreateChannel() {
  const { error, fetchData } = useFetch();
  const { user } = useAuthContext();
  const [profileImage, setProfileImage] = useState();

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const profileImg = formData.get("profileimage");

    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result.split(",")[1];

      fetchData("http://localhost:3000/createchannel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          username,
          base64Image,
        }),
      });
    };

    if (profileImg) {
      reader.readAsDataURL(profileImg);
    }
  }

  function handleProfileImage(e) {
    const image = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = event.target.result;
      setProfileImage(img);
    };

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  return (
    <>
      <Nav />
      <div className='mt-10'>
        <div className='w-72 bg-blue-300 mx-auto p-4 flex flex-col gap-5 items-center pb-7 '>
          <form className='flex flex-col gap-3 w-full' onSubmit={handleSubmit}>
            <div className='relative'>
              <img
                src={profileImage || "/src/image/profile.jpg"}
                className='h-20 w-20 rounded-full object-cover'
              />

              <label htmlFor='profileImage'>
                <input
                  type='file'
                  name='profileimage'
                  id='profileImage'
                  accept='image/*'
                  className='hidden'
                  onChange={handleProfileImage}
                />
                <CameraIcon className='size-6 absolute bottom-1 right-4 cursor-pointer' />
              </label>
            </div>

            <Input type={"text"} name={"username"} placeholder={"Username"} />
            <Button>Create channel</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateChannel;
