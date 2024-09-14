import { useEffect } from "react";
import Nav from "../components/Nav";
import VideoGrid from "../components/VideoGrid";
import useFetch from "../hooks/useFetch";

function Home() {
  const [data, error, isLoading, fetchData] = useFetch();

  useEffect(() => {
    fetchData("http://localhost:3000/", {
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
