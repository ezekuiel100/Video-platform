import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import VideoGrid from "../components/VideoGrid";

function Home() {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Nav />
      <VideoGrid videos={videos} />
    </>
  );
}

export default Home;
