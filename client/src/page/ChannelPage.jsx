import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

import Nav from "../components/Nav";
import { useEffect } from "react";

function ChannelPage() {
  const { data: channel, fetchData } = useFetch();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    fetchData(`http://localhost:3000/channel/${id}`, {
      credentials: "include",
    });
  }, [id]);

  if (!channel) return;

  return (
    <>
      <Nav />
      <div className='flex justify-center'>
        <div className='basis-[70rem] max-w-[70rem] '>
          <div className='flex gap-2  p-2 py-4'>
            <img
              src={channel.profileImage}
              className='h-16 w-16 rounded-full '
            ></img>
            <div className='flex flex-col'>
              <h1 className='text-xl leading-6'>{channel.name}</h1>
              <div className='flex gap-2 text-xs text-gray-500 '>
                <p>{channel.subscribers} subscribe</p>
                <span>-</span>
                <p>{channel?.videos.length} videos</p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2 gap-y-8 p-4'>
            {channel.videos.map((video, i) => (
              <Link to={`/video/${video.id}`} key={i}>
                <video src={video.url} className='h-40 w-72 mb-1' />
                <h3 className='text-base leading-none font-semibold cursor-pointer'>
                  {video.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChannelPage;
