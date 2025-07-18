import { useRef, useState } from "react";
import Nav from "../components/Nav";
import generateThumbnail from "../utils/generateThumbnail";
import { sendVideo } from "../utils/sendVideo";
import VideoUpload from "../components/VideoUpload";

function UploadVideoPage() {
  const ref = useRef(null);
  const refImg = useRef(null);
  const [title, setTitle] = useState()
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
    <div className="min-h-screen flex flex-col">
      <Nav />

      {videoFile ? <VideoUpload videoFile={videoFile} /> :
        <div className="flex-1 text-black flex justify-center items-center">
          <div className="bg-white w-[28rem] h-[20rem] rounded-xl py-10 px-12 flex flex-col ">
            <h1 className="text-center text-2xl mb-3 text-blue-800 font-bold">Selecione o Vídeo</h1>

            <label htmlFor="upload" className="flex-1 flex items-center justify-center cursor-pointer">
              <div className="w-full h-full border-2 border-blue-500 border-dashed flex flex-col items-center justify-center rounded-xl">
                <svg className="w-12 h-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <h2 className="text-blue-800 font-semibold text-lg">Clique ou arraste o vídeo aqui</h2>
                <p className="text-gray-500">Até 100MB</p>
                <input ref={ref} type="file" accept="video/*" className="hidden" id="upload" onChange={handleFile} />
              </div>
            </label>
          </div>
        </div>
      }
    </div >
  );
}

export default UploadVideoPage;
