import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import useAuthContext from "../AuthContext";

function ChannelPage() {
  const { data: channel, fetchData } = useFetch();
  const [isSubscribed, setIsSubscribed] = useState(null);
  const { user, setUser } = useAuthContext();
  const { id } = useParams();

  useEffect(() => {
    setIsSubscribed(user?.subscriptions?.some((sub) => sub.channelId === id));
  }, [user]);

  useEffect(() => {
    if (!id) return;
    fetchData(`https://13.58.63.58:3000/channel/${id}`, {
      credentials: "include",
    });
  }, [id]);

  function handleSubscribe() {
    fetch(`https://13.58.63.58:3000/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user?.id, channelId: id }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setIsSubscribed(true);
      })
      .catch((error) => {
        console.error("Erro ao desinscrever-se:", error);
      });
  }

  if (!channel) return;

  return (
    <>
      <Nav />
      <div className='flex justify-center'>
        <div className='basis-[70rem] max-w-[70rem] '>
          <div className='flex gap-2  p-2 py-4'>
            <img
              src={channel.profileImage}
              className='h-16 w-16 rounded-full '
            ></img>
            <div className='flex flex-col'>
              <h1 className='text-xl leading-6'>{channel.name}</h1>
              <div className='flex gap-2 text-xs text-gray-500 mb-1'>
                <p>{channel?._count.subscription} subscribe</p>
                <span>-</span>
                <p>{channel?.videos?.length} videos</p>
              </div>
              {isSubscribed ? (
                <Subscribed
                  setIsSubscribed={setIsSubscribed}
                  setUser={setUser}
                />
              ) : (
                <button
                  disabled={!isSubscribed}
                  className={`bg-blue-500 py-1 text-sm text-white rounded-xl cursor-pointer hover:bg-blue-600
                 ${user?.channel?.id === id && "hidden"}`}
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>

          <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2 gap-y-8 p-4'>
            {channel.videos.map((video, i) => (
              <Link to={`/video/${video.id}`} key={i}>
                <video src={video.url} className='h-40 w-72 mb-1' />
                <h3 className='text-base leading-none font-semibold cursor-pointer'>
                  {video.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Subscribed({ setIsSubscribed, setUser }) {
  const { user } = useAuthContext();
  const { id } = useParams();

  function handleUnsubscribe() {
    fetch(`http://localhost:3000/unsubscribe`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id, channelId: id }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setIsSubscribed(false);
      })
      .catch((error) => {
        console.error("Erro ao desinscrever-se:", error);
      });
  }

  return (
    <>
      <button
        onClick={handleUnsubscribe}
        className='bg-gray-400 p-1 rounded-xl text-white text-sm'
      >
        {" "}
        Subscribed
      </button>
    </>
  );
}

export default ChannelPage;
