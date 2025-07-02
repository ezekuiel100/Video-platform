import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav";
import useFetch from "../hooks/useFetch";
import { Eye } from "lucide-react";

function VideoPage() {
  const [videoDetails, setVideoDetails] = useState(null);
  const [, , , fetchData] = useFetch(null);
  const [expanded, setExpanded] = useState(false);

  const ref = useRef(0);
  const { id } = useParams();

  const description = videoDetails?.description || "Nenhuma descrição";
  const hasDescription = !!videoDetails?.description;
  const isLong = description.length > 50;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/video/${id}`)
      .then((res) => setVideoDetails(res.data))

      .catch((error) => console.log(error));
  }, [id]);

  function handleClick() {
    if (ref.current == 0) {
      fetchData(`http://localhost:3000/api/views/${id}`, {
        method: "POST",
      });
      ref.current++;
    }
  }

  return (
    <>
      <Nav />
      <div className='mt-4 flex justify-center'>
        <div className='h-full w-[40rem] px-4'>
          <video
            src={videoDetails?.url}
            className='w-full max-h-96'
            controls
            onPlay={handleClick}
          ></video>
          <div className='flex justify-between my-2'>
            <h1 className='text-2xl'>{videoDetails?.title}</h1>
          </div>

          <div className='flex justify-between px-2'>
            <div className='flex gap-2'>
              <Link to={`/channel/${videoDetails?.channel.id}`}>
                <img
                  src={videoDetails?.channel.profileImage}
                  className='h-9 w-9 rounded-full cursor-pointer'
                />
              </Link>
              <div className='leading-4'>
                <Link to={`/channel/${videoDetails?.channel.id}`}>
                  <p>{videoDetails?.channel.name} </p>
                </Link>
                <p className='text-xs text-gray-400'>
                  {videoDetails?.channel.subscribers} 0 subscribers
                </p>
              </div>

            </div>

            <div className="flex gap-2 items-center">
              <Eye className="size-3 text-gray-400" />
              <p className="text-xs">{videoDetails?.views}</p>
            </div>
          </div>

          <div className="p-2 ring-[0.3px] ring-gray-600 rounded-lg my-4">
            <p className={`break-words ${expanded ? "" : "line-clamp-2"} ${hasDescription ? "" : "text-gray-400 text-sm"}`}>
              {description}
            </p>

            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-blue-400 text-lg mt-2 "
              >
                {expanded ? "ver menos" : "...mais"}
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default VideoPage;
