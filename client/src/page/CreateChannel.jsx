import { CameraIcon } from "@heroicons/react/24/outline";
import Input from "../components/Input";
import Button from "../components/Button";
import useFetch from "../hooks/useFetch";
import Nav from "../components/Nav";
import useAuthContext from "../AuthContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateChannel() {
  const { error, data, fetchData } = useFetch();
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const [profileImage, setProfileImage] = useState();
  const ref = useRef();

  useEffect(() => {
    if (data) {
      setUser(data);
      navigate("/");
    }
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const profileImg = formData.get("profileimage");
    const imageFileName = ref?.current?.files[0];

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
          imageFileName: imageFileName?.name,
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
        <form
          className='w-72 bg-blue-300 mx-auto p-4 pb-7 flex flex-col gap-3'
          onSubmit={handleSubmit}
        >
          <div className='relative w-fit mx-auto'>
            <img
              src={profileImage || "/src/image/profile.jpg"}
              className='h-20 w-20 rounded-full object-cover'
            />

            <label
              htmlFor='profileImage'
              className='absolute bottom-1 right-4 '
            >
              <input
                ref={ref}
                type='file'
                name='profileimage'
                id='profileImage'
                accept='image/*'
                className='hidden '
                onChange={handleProfileImage}
              />
              <CameraIcon className='size-6 cursor-pointer' />
            </label>
          </div>

          <Input type={"text"} name={"username"} placeholder={"Username"} />
          <Button>Create channel</Button>
        </form>
      </div>
    </>
  );
}

export default CreateChannel;
