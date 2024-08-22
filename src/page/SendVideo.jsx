import { CloudArrowUpIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import axios from "axios";

function SendVideo() {
  const [videoFile, setvideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const ref = useRef();
  const refImg = useRef();

  function handleFile(e) {
    const file = ref.current.files[0];
    const videoUrl = URL.createObjectURL(file);
    setvideoFile(videoUrl);
    sendVideo();
  }

  function handleImage(e) {
    const img = refImg.current.files[0];
    const imgUrl = URL.createObjectURL(img);
    setImageFile(imgUrl);
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

      axios
        .post("http://localhost:3000/upload", {
          file: base64File,
          fileName: fileName,
          authorId: 1,
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log("Erro:", error));
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='grid grid-cols-2  w-[50rem] h-[30rem] bg-blue-200 rounded-3xl'>
        <form className='flex flex-col items-center gap-20 p-6 py-12'>
          <div className='w-full'>
            <label htmlFor='title'>Title:</label>
            <input
              type='text'
              name='title'
              className='w-full p-2 rounded-lg outline-none'
            />
          </div>

          <div>
            <span>Thumbnail:</span>
            {imageFile ? (
              <img src={imageFile} className='h-60 w-52 object-cover'></img>
            ) : (
              <label htmlFor='thumbnail' className='cursor-pointer'>
                <input
                  ref={refImg}
                  type='file'
                  name=''
                  id='thumbnail'
                  accept='image/*'
                  onChange={handleImage}
                  className='hidden'
                />
                <div className='bg-white border border-gray-200 w-48 h-24 rounded-sm grid place-content-center'>
                  <PhotoIcon className='size-6' />
                </div>
              </label>
            )}
          </div>
        </form>

        {videoFile ? (
          <div className='grid place-items-center'>
            <video src={videoFile} className='w-80 h-60'></video>
            <button className='text-white bg-blue-500 rounded-xl w-64 '>
              Publicar
            </button>
          </div>
        ) : (
          <label
            htmlFor='file'
            className='flex flex-col justify-center items-center gap-4'
          >
            <input
              ref={ref}
              type='file'
              name=''
              id='file'
              className='hidden'
              accept='video/*'
              onChange={handleFile}
            />
            <CloudArrowUpIcon className='size-52 cursor-pointer' />
            <p className='text-2xl text-center'>Select video</p>
          </label>
        )}
      </div>
    </div>
  );
}

export default SendVideo;
