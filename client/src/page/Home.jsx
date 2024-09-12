import { useEffect } from "react";
import Nav from "../components/Nav";
import VideoGrid from "../components/VideoGrid";
import useFetch from "../hooks/useFetch";

function Home() {
  const { data, fetchData } = useFetch();

  useEffect(() => {
    fetchData("https://13.58.63.58:3000/", {
      credentials: "include",
    });
  }, []);

  return (
    <>
      <Nav />
      <VideoGrid videos={data} />
    </>
  );
}

export default Home;
