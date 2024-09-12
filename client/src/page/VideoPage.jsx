import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav";
import useFetch from "../hooks/useFetch";

function VideoPage() {
  const [videoDetails, setVideoDetails] = useState(null);
  const { error, fetchData } = useFetch();
  const ref = useRef(0);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://13.58.63.58:3000/api/video/${id}`)
      .then((res) => setVideoDetails(res.data))
      .catch((error) => console.log(error));
  }, []);

  function handleClick() {
    if (ref.current == 0) {
      fetchData(`https://13.58.63.58:3000/api/views/${id}`, {
        method: "POST",
      });
      ref.current++;
    }
  }

  return (
    <>
      <Nav />
      <div className='mt-4 flex justify-center'>
        <div>
          <video
            src={videoDetails?.url}
            className='h-96'
            controls
            onPlay={handleClick}
          ></video>
          <div className='flex justify-between mb-2'>
            <h1 className='text-2xl'>{videoDetails?.title}</h1>
            <p>{videoDetails?.views} views</p>
          </div>

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
              <p className='text-xs'>
                {videoDetails?.channel.subscribers} subscribers
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPage;
