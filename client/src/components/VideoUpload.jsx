import { useRef, useState } from "react";
import generateThumbnail from "../utils/generateThumbnail";
import { sendVideo } from "../utils/sendVideo";

function VideoUpload({ videoFile, file }) {
  const [title, setTitle] = useState("")
  const refImg = useRef(null);

  async function handleUpload() {
    const thumbnail = refImg?.current?.files[0] || await generateThumbnail(file)

    sendVideo(title, file, thumbnail);
  }

  return (
    <div className="flex gap-6 m-auto">
      <div className="bg-white min-h-96 p-6 rounded-xl flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-blue-600 font-semibold">Título</label>
          <input onChange={(e) => setTitle(e.target.value)} type="text" name="" id="" className="border-2 rounded-md focus:ring-1 outline-none text-gray-500 p-1" placeholder="Ex: Minhas ferias incríveis" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-blue-600 font-semibold">Descrição</label>
          <textarea className="border-2 rounded-md focus:ring-1 outline-none text-gray-500 resize-none p-1" placeholder="Descreva seu vídeo..."></textarea>
        </div>


        <div>
          <h3 className="text-blue-600 font-semibold mb-2">Escolha uma thumbnail</h3>
          <div className="flex gap-2">
            <div className="bg-gray-300 w-48 h-32 rounded-md"></div>
            <div className="bg-gray-300 w-48 h-32 rounded-md"></div>
          </div>
        </div>

        <button className="bg-blue-600 p-2 rounded-md" onClick={handleUpload}>Enviar vídeo</button>
      </div>

      <div className="bg-white rounded-xl max-h-72 w-96 p-8">
        <h3 className="text-blue-600 font-semibold mb-1">Prévia do vídeo</h3>
        <video src={videoFile} className="aspect-video w-full" controls />
      </div>

    </div>
  );
}

export default VideoUpload;
