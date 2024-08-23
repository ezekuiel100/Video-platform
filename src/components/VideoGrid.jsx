function VideoGrid({ videos }) {
  return (
    <div className='max-w-[80rem] grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2 gap-y-8 p-4 mx-auto'>
      {videos?.map((video, i) => (
        <div key={i}>
          <div className='relative'>
            {video.thumbnail && (
              <img
                src={video.thumbnail}
                className='absolute h-40 w-72 object-cover'
              />
            )}
            <video
              src={video.url}
              className=' bg-emerald-300 h-40 w-72 mb-1 '
            />
          </div>
          <div className='flex gap-2'>
            <img src='/src/image/profile.jpg' className='h-10 rounded-full' />
            <h3 className='text-lg '>{video.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoGrid;
