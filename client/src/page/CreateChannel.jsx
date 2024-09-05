import { CameraIcon } from "@heroicons/react/24/outline";
import Input from "../components/Input";
import Button from "../components/Button";
import useFetch from "../hooks/useFetch";
import Nav from "../components/Nav";
import useAuthContext from "../AuthContext";

function CreateChannel() {
  const { error, fetchData } = useFetch();
  const { user } = useAuthContext();

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const username = formData.get("username");

    fetchData("http://localhost:3000/createchannel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, userId: user.id }),
    });
  }

  return (
    <>
      <Nav />
      <div className='mt-10'>
        <div className='w-72 bg-blue-300 mx-auto p-4 flex flex-col gap-5 items-center pb-7 '>
          <div className='relative'>
            <img
              src='/src/image/profile.jpg'
              className='h-20 w-20 rounded-full'
            />
            <CameraIcon className='size-6 absolute bottom-1 right-4' />
          </div>

          <form className='flex flex-col gap-3 w-full' onSubmit={handleSubmit}>
            <Input type={"text"} name={"username"} placeholder={"Username"} />
            <Button>Create channel</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateChannel;
