import { CameraIcon } from "@heroicons/react/24/outline";
import Input from "../components/Input";

function CreateChannel() {
  return (
    <div className='mt-10'>
      <div className='w-72 bg-blue-300 mx-auto p-4 flex flex-col gap-3 items-center '>
        <div className='relative'>
          <img
            src='/src/image/profile.jpg'
            className='h-20 w-20 rounded-full'
          />
          <CameraIcon className='size-6 absolute bottom-1 right-4' />
        </div>

        <form className='flex flex-col gap-2 w-full'>
          <Input type={"text"} name={"name"} placeholder={"Name"} />
          <Input type={"text"} name={"channel"} placeholder={"Username"} />
        </form>
      </div>
    </div>
  );
}

export default CreateChannel;
