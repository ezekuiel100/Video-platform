function VideoGrid({ videos }) {
  return (
    <div className="max-w-[80rem] bg-red-200 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2 p-4 mx-auto">
      {videos?.map((video, i) => (
        <video key={i} src={video.url} className="bg-green-700 h-56 w-72 " />
      ))}
    </div>
  );
}

export default VideoGrid;
