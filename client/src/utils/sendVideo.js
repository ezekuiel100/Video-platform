import axios from "axios";
import uploadFileToPresignedUrl from "./uploadFileToPresignedUrl";

export async function sendVideo(title, file, thumbnail) {
  if (!file) {
    console.log("Nenhum arquivo selecionado");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:3000/upload",
      {
        title,
        fileName: file.name,
        fileType: file.type,
        thumbName: thumbnail?.name,
        thumbType: thumbnail?.type,
      },
      { withCredentials: true }
    );

    const urlPresigned = res.data;

    uploadFileToPresignedUrl(urlPresigned.videoUrl, file)

    if (urlPresigned.thumbUrl) {
      uploadFileToPresignedUrl(urlPresigned.thumbUrl, thumbnail)
    }

  } catch (error) {
    console.log("Erro:", error);
  }
}