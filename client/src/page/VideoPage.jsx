import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav";

function VideoPage() {
  const [videoDetails, setVideoDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/video/${id}`)
      .then((res) => setVideoDetails(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Nav />
      <div className='mt-4 flex justify-center'>
        <div>
          <video src={videoDetails?.url} className='h-96' controls></video>
          <h1 className='text-2xl'>{videoDetails?.title}</h1>
          <p>{videoDetails?.views} views</p>
        </div>
      </div>
    </>
  );
}

//profile pic
//channel name
//views

export default VideoPage;
