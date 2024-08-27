import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useAuthContext from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import VideoUpload from "../components/VideoUpload";
import SelectThumbnail from "../components/SelectThumbnail";
import VideoForm from "../components/VideoForm";

function UploadVideo() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const ref = useRef();
  const refImg = useRef();

  const { user, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  async function sendVideo() {
    const file = ref.current.files[0];
    const thumbnail = refImg.current.files[0];

    if (!file) {
      console.log("Nenhum arquivo selecionado");
      return;
    }

    const fileName = file.name;
    const thumbName = thumbnail?.name;

    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          resolve(reader.result.split(",")[1]);
        };

        reader.onerror = (error) => {
          reject(error);
        };
      });
    }

    const base64File = await fileToBase64(file);

    let thumb = null;

    if (thumbnail) {
      thumb = await fileToBase64(thumbnail);
    }

    axios
      .post(
        "http://localhost:3000/upload",
        {
          file: base64File,
          fileName: fileName,
          thumbName,
          authorId: user.id,
          title,
          thumbnail: thumb,
        },
        { withCredentials: true }
      )
      .then((data) => {
        if (data.status == 200) {
          window.location.reload();
        }
      })
      .catch((error) => console.log("Erro:", error));
  }

  return (
    <>
      <Nav />
      <div className='h-screen flex justify-center items-center'>
        <div className='grid grid-cols-2 w-[50rem] h-[30rem] bg-blue-200 rounded-3xl'>
          <div className='flex flex-col items-center gap-20 px-8 py-12 '>
            <VideoForm title={title} setTitle={setTitle} />
            <SelectThumbnail ref={refImg} />
          </div>

          <VideoUpload onUpload={sendVideo} ref={ref} />
        </div>
      </div>
    </>
  );
}

export default UploadVideo;
