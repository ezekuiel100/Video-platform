import Nav from "../components/Nav";
import VideoGrid from "../components/VideoGrid";
import useFetch from "../hooks/useFetch";

function Home() {
  const { data, fetchData } = useFetch();

  // fetchData("http://localhost:3000/", {
  //   credentials: "include",
  // });

  console.log("homeeee");

  return (
    <>
      <Nav />
      <VideoGrid videos={data} />
    </>
  );
}

export default Home;
