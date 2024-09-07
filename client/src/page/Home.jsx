import { useEffect } from "react";
import Nav from "../components/Nav";
import VideoGrid from "../components/VideoGrid";
import useFetch from "../hooks/useFetch";

function Home() {
  const { data, fetchData } = useFetch();

  console.log(data);

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
