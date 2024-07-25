import { useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";

function App() {
  const [videoFile, setvideoFile] = useState(null);
  const [videos, setVideos] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState(0);

  const ref = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      name,
      email,
    };

    const response = await fetch(`http://localhost:3000/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("User create:", data);
      setName("");
      setEmail("");
    }
  }

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

      setProgress(0);

      axios
        .post(
          "http://localhost:3000/upload",
          {
            file: base64File,
            fileName: fileName,
            authorId: 1,
          },
          {
            onUploadProgress: (progressEvent) => {
              const { loaded, total } = progressEvent;
              const porcentageCompleted = (loaded / total) * 100;
              console.log(porcentageCompleted);
              setProgress(porcentageCompleted);
            },
          }
        )
        .then((data) => {
          console.log("Sucesso:", data);
          setProgress(100);
        })
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

        <progress
          id="progressBar"
          max="100"
          value={progress}
          className="w-60 bg-red-400 rounded-full"
        ></progress>
      </div>

      <div className="space-y-6 p-4">
        {videos?.map((video, i) => (
          <div key={i}>
            <video src={video.url} controls className="h-56 w-72 " />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
