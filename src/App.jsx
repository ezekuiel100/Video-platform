import { useState } from "react";
import { useRef } from "react";

function App() {
  const [video, setvideo] = useState(null);
  const ref = useRef();

  function file(e) {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target.result.startsWith("data:video")) return;
      setvideo(e.target.result);
    };
    reader.readAsDataURL(ref.current.files[0]);
  }

  return (
    <>
      <h1>Video</h1>
      <input type="file" ref={ref} onChange={file} />
      <video src={video} controls style={{ height: 400 }} />
    </>
  );
}

export default App;
