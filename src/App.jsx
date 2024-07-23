import { useEffect, useState } from "react";
import { useRef } from "react";

function App() {
  const [videoFile, setvideoFile] = useState(null);
  const [videos, setVideos] = useState(null);

  const ref = useRef();

  function handleFile(e) {
    const file = ref.current.files[0];
    const videoUrl = URL.createObjectURL(file);
    setvideoFile(videoUrl);
  }

  function sendVideo() {
    const file = ref.current.files[0];

    if (!file) {
      console.log("Nenhum arquivo selecionado");
      return;
    }

    const fileName = file.name;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64File = reader.result.split(",")[1];

      fetch("http://localhost:3000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: base64File,
          fileName: fileName,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Sucesso:", data))
        .catch((error) => console.log("Erro:", error));
    };

    reader.readAsDataURL(file);
  }

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="p-4">
        <h1 className="text-xl mb-2">Send Video</h1>
        <input type="file" accept="video/mp4" ref={ref} onChange={handleFile} />

        <video
          src={videoFile}
          controls
          className={`${videoFile ? "h-96" : "hidden"} `}
        />

        <div className="mt-4">
          <button onClick={sendVideo} className="bg-blue-300 p-2 m-2">
            Enviar video
          </button>
        </div>
      </div>

      <div className="space-y-6 p-4">
        {videos?.map((video, i) => (
          <div key={i}>
            <video src={video.url} controls className="h-56" />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
