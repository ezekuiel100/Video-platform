import { useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
import Nav from "./components/Nav";
import VideoGrid from "./components/VideoGrid";

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
      <Nav />
      <VideoGrid videos={videos} />
    </>
  );
}

export default App;
