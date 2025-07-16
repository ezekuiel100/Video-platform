import { useRef, useState } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { sendVideo } from "../utils/sendVideo";
import generateThumbnail from "../utils/generateThumbnail";

function VideoUpload({ title, refImg }) {
  const ref = useRef(null);
  const [videoFile, setvideoFile] = useState(null);

  function handleFile() {
    const file = ref.current.files[0];
    const videoUrl = URL.createObjectURL(file);
    setvideoFile(videoUrl);
  }

  async function handleUpload() {
    const file = ref.current.files[0];
    const thumbnail = refImg?.current?.files[0] || await generateThumbnail(file)

    sendVideo(title, file, thumbnail);
  }

  return (
    <>
      <div className={`${videoFile ? "grid place-items-center" : "hidden"}`}>
        <video src={videoFile} className={`w-80 h-60 `}></video>
        <button
          onClick={handleUpload}
          className='text-white bg-blue-500 rounded-full w-64 p-1'
        >
          Publicar
        </button>
      </div>

      <label
        htmlFor='file'
        className={`flex flex-col justify-center items-center gap-4  ${videoFile && "hidden"
          }`}
      >
        <input
          ref={ref}
          type='file'
          name=''
          id='file'
          className='hidden '
          accept='video/*'
          onChange={handleFile}
        />
        <CloudArrowUpIcon className='size-52 cursor-pointer' />
        <p className='text-2xl text-center'>Select video</p>
      </label>
    </>
  );
};

export default VideoUpload;
