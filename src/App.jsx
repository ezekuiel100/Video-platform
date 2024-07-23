import { useEffect, useState } from "react";
import { useRef } from "react";

function App() {
  const [video, setvideo] = useState(null);
  const ref = useRef();

  function handleFile(e) {
    const file = ref.current.files[0];
    const videoUrl = URL.createObjectURL(file);
    setvideo(videoUrl);
  }

  function sendVideo() {
    const file = ref.current.files[0];
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

  return (
    <>
      <h1 className="text-xl">Send Video</h1>
      <input type="file" accept="video/mp4" ref={ref} onChange={handleFile} />
      <video src={video} controls className={`${video ? "h-96" : "hidden"} `} />
      <button onClick={sendVideo} className="bg-blue-300 p-2 m-2">
        Enviar video
      </button>
    </>
  );
}

export default App;
