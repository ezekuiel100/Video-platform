function VideoGrid({ videos }) {
  return (
    <div className='max-w-[80rem] grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2 gap-y-8 p-4 mx-auto'>
      {videos?.map((video, i) => (
        <div key={i}>
          <video src={video.url} className='bg-green-700 h-56 w-72 mb-1' />
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
