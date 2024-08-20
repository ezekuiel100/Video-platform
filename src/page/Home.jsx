import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import VideoGrid from '../components/VideoGrid';
import useAuthContext from '../AuthContext';

function Home() {
  const [videos, setVideos] = useState(null);
  const { token } = useAuthContext();


  useEffect(() => {
    fetch('http://localhost:3000/', {
      headers: {
        "authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <>
      <Nav />
      <VideoGrid videos={videos} />
    </>
  );
}

export default Home;
