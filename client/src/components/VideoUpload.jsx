import { useRef, useState } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { forwardRef } from "react";

const VideoUpload = forwardRef(({ onUpload }, ref) => {
  const [videoFile, setvideoFile] = useState(null);

  function handleFile(e) {
    const file = ref.current.files[0];
    const videoUrl = URL.createObjectURL(file);
    setvideoFile(videoUrl);
  }

  return (
    <>
      <div className={`${videoFile ? "grid place-items-center" : "hidden"}`}>
        <video src={videoFile} className={`w-80 h-60 `}></video>
        <button
          onClick={onUpload}
          className='text-white bg-blue-500 rounded-xl w-64 '
        >
          Publicar
        </button>
      </div>

      <label
        htmlFor='file'
        className={`flex flex-col justify-center items-center gap-4  ${
          videoFile && "hidden"
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
});

export default VideoUpload;
