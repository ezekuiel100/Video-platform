import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav";
import useFetch from "../hooks/useFetch";
import { Eye, ThumbsUp, ThumbsDown, Calendar } from "lucide-react";
import RecomendadVideos from "../components/RecommendedVideos";
import { format } from 'date-fns';

function VideoPage() {
  const [videoDetails, setVideoDetails] = useState(null);
  const [, , , fetchData] = useFetch(null);
  const [expanded, setExpanded] = useState(false);

  const ref = useRef(0);
  const { id } = useParams();

  const description = videoDetails?.description || "Nenhuma descrição";
  const hasDescription = !!videoDetails?.description;
  const isLong = description.length > 50;

  const data = new Date();
  const formatada = format(data, "dd MMM yy").toLowerCase();

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
        <div className='px-4 w-full max-w-[90rem]'>
          <div className="aspect-video w-full  ">
            <video
              src={videoDetails?.url}
              className='bg-black object-cover rounded-lg w-full h-full'
              controls
              onPlay={handleClick}
            ></video>
          </div >

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

            <div className="flex gap-4 items-center">
              <div className="flex gap-1 items-center">
                <Eye className="size-4 text-gray-400" />
                <p className="text-sm">{videoDetails?.views}</p>
              </div>

              <div className="flex gap-1 items-center">
                <Calendar className="size-4 text-gray-400" />
                {formatada}
              </div>

              <div className="w-44 rounded-full bg-gray-800 flex justify-around items-center gap-2 px-3 py-1">
                <div className="flex gap-2 justify-around items-center">
                  <ThumbsUp className="size-5 cursor-pointer" />
                  10K
                </div>
                |
                <div className="flex gap-2 justify-around items-center">
                  <ThumbsDown className="size-5 cursor-pointer" />
                  20
                </div>
              </div>
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

        </div >

        <RecomendadVideos />
      </div >
    </>
  );
}

export default VideoPage;
