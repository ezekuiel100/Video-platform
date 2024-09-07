import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

import Nav from "../components/Nav";
import { useEffect } from "react";

function ChannelPage() {
  const { data, fetchData } = useFetch();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    fetchData(`http://localhost:3000/channel/${id}`);
  }, [id]);

  if (!data) return;

  return (
    <>
      <Nav />
      <div className='flex justify-center'>
        <div className='basis-[70rem] max-w-[70rem] '>
          <div className='flex gap-2  p-2 py-4'>
            <img
              src={data.profileImage}
              className='h-16 w-16 rounded-full '
            ></img>
            <h1 className='text-xl'>{data.name}</h1>
          </div>

          <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2 gap-y-8 p-4'>
            {data.videos.map((video, i) => (
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
