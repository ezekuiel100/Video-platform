import axios from "axios";

export async function sendVideo(title, file, thumbnail, user) {
  if (!file) {
    console.log("Nenhum arquivo selecionado");
    return;
  }

  const fileName = file.name;
  const thumbName = thumbnail?.name;

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const base64File = await fileToBase64(file);

  let thumb = null;

  if (thumbnail) {
    thumb = await fileToBase64(thumbnail);
  }

  axios
    .post(
      "http://localhost:3000/upload",
      {
        file: base64File,
        fileName: fileName,
        thumbName,
        title,
        thumbnail: thumb,
        channel: user.channel.id,
      },
      { withCredentials: true }
    )
    .then((data) => {
      if (data.status == 200) {
        window.location.reload();
      }
    })
    .catch((error) => console.log("Erro:", error));
}
