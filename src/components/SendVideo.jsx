function SendVideo() {
  return (
    <div className="p-4">
      <h1 className="text-xl mb-2">Send Video</h1>
      <input type="file" accept="video/mp4" ref={ref} onChange={handleFile} />

      <video
        src={videoFile}
        controls
        className={`${videoFile ? "h-96" : "hidden"} `}
      />

      <div className="mt-4">
        <button onClick={sendVideo} className="bg-blue-300 p-2 m-2">
          Enviar video
        </button>
      </div>

      <progress
        id="progressBar"
        max="100"
        value={progress}
        className="w-60  rounded-full"
      ></progress>
    </div>
  );
}

export default SendVideo;
