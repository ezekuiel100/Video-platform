import { useRef, useState } from "react";
import Nav from "../components/Nav";
import VideoUpload from "../components/VideoUpload";
import SelectThumbnail from "../components/SelectThumbnail";
import VideoForm from "../components/VideoForm";

function UploadVideo() {
  const [title, setTitle] = useState("");
  const refImg = useRef(null);
  return (
    <>
      <Nav />
      <div className='h-screen flex justify-center items-center'>
        <div className='grid grid-cols-2 w-[50rem] h-[30rem] bg-blue-200 rounded-3xl'>
          <div className='flex flex-col items-center gap-20 px-8 py-12 '>
            <VideoForm title={title} setTitle={setTitle} />
            <SelectThumbnail ref={refImg} />
          </div>

          <VideoUpload refImg={refImg} title={title} />
        </div>
      </div>
    </>
  );
}

export default UploadVideo;
