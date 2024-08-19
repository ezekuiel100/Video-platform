function SendVideo() {
  const [videoFile, setvideoFile] = useState(null);
  const [progress, setProgress] = useState(0);

  function handleFile(e) {
    const file = ref.current.files[0];
    const videoUrl = URL.createObjectURL(file);
    setvideoFile(videoUrl);
  }

  function sendVideo() {
    const file = ref.current.files[0];

    if (!file) {
      console.log("Nenhum arquivo selecionado");
      return;
    }

    const fileName = file.name;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64File = reader.result.split(",")[1];

      setProgress(0);

      axios
        .post(
          "http://localhost:3000/upload",
          {
            file: base64File,
            fileName: fileName,
            authorId: 1,
          },
          {
            onUploadProgress: (progressEvent) => {
              const { loaded, total } = progressEvent;
              const porcentageCompleted = (loaded / total) * 100;
              setProgress(porcentageCompleted);
            },
          }
        )
        .then((data) => {
          console.log("Sucesso:", data);
          setProgress(100);
        })
        .catch((error) => console.log("Erro:", error));
    };

    reader.readAsDataURL(file);
  }

  return <div></div>;
}

export default SendVideo;
