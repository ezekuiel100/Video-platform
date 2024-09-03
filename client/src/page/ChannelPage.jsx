import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function ChannelPage() {
  const { id } = useParams();

  const { data } = useFetch(`http://localhost:3000/channel/${id}`);

  return (
    <div>
      <img src='/src/image/profile.jpg' className='h-9 rounded-full '></img>
      <h1>Channel</h1>
      {JSON.stringify(data)}
    </div>
  );
}

export default ChannelPage;
