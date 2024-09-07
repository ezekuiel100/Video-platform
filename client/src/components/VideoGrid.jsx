import { Link } from "react-router-dom";

function VideoGrid({ videos }) {
  return (
    <div className='max-w-[80rem] grid  grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-2 gap-y-8 p-4 mx-auto '>
      {videos?.map((video, i) => (
        <div key={i}>
          <div className='relative'>
            {video.thumbnail && (
              <Link to={`video/${video.id}`}>
                <img
                  src={video.thumbnail}
                  className='absolute h-full w-full object-cover cursor-pointer'
                />
              </Link>
            )}
            <Link to={`video/${video.id}`}>
              <video
                src={video.url}
                className='h-full w-full mb-1 cursor-pointer'
              />
            </Link>
          </div>
          <div className='flex gap-2'>
            <Link to={`/channel/${video.channelId}`} className='flex-shrink-0'>
              <img
                src={video.channel.profileImage}
                className='h-9 w-9 rounded-full cursor-pointer'
              />
            </Link>
            <div>
              <Link to={`video/${video.id}`}>
                <h3 className='text-base leading-none font-semibold cursor-pointer'>
                  {video.title}
                </h3>
              </Link>
              <Link to={`/channel/${video.channelId}`}>
                <p className='text-xs text-gray-500 hover:text-gray-700 transition-all'>
                  {video.channel.name}
                </p>
              </Link>
              <p className='text-xs text-gray-500'>{video.views} views</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoGrid;
