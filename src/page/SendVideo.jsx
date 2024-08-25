import { CloudArrowUpIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useAuthContext from "../AuthContext";
import NavMenu from "../components/NavMenu";
import { Link, useNavigate } from "react-router-dom";

function SendVideo() {
  const [videoFile, setvideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuthContext();

  console.log(user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const ref = useRef();
  const refImg = useRef();

  function handleFile(e) {
    const file = ref.current.files[0];
    const videoUrl = URL.createObjectURL(file);
    setvideoFile(videoUrl);
  }

  function handleImage(e) {
    const img = refImg.current.files[0];
    const imgUrl = URL.createObjectURL(img);
    setImageFile(imgUrl);
  }

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
      <nav className='bg-white flex justify-between py-1 px-10 drop-shadow-md'>
        <Link to={"/"}>Home</Link>
        <NavMenu />
      </nav>
      <div className='h-screen flex justify-center items-center'>
        <div className='grid grid-cols-2  w-[50rem] h-[30rem] bg-blue-200 rounded-3xl'>
          <form className='flex flex-col items-center gap-20 p-6 py-12'>
            <div className='w-full'>
              <label htmlFor='title'>Title:</label>
              <input
                type='text'
                name='title'
                value={title}
                className='w-full p-2 rounded-lg outline-none'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <span>Thumbnail:</span>

              <img
                src={imageFile}
                className={`h-40 w-72  ${imageFile ? "" : "hidden"}`}
              ></img>

              <label
                htmlFor='thumbnail'
                className={`cursor-pointer ${imageFile ? "hidden" : ""}`}
              >
                <input
                  ref={refImg}
                  type='file'
                  name=''
                  id='thumbnail'
                  accept='image/*'
                  onChange={handleImage}
                  className='hidden'
                />
                <div className='bg-white border border-gray-200 h-40 w-72 rounded-sm grid place-content-center'>
                  <PhotoIcon className='size-6' />
                </div>
              </label>
            </div>
          </form>

          <div
            className={`${videoFile ? "grid place-items-center" : "hidden"}`}
          >
            <video src={videoFile} className={`w-80 h-60 `}></video>
            <button
              onClick={sendVideo}
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
        </div>
      </div>
    </>
  );
}

export default SendVideo;
