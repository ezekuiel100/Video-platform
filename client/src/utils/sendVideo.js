import axios from "axios";

export async function sendVideo(title, file, thumbnail, user) {
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
        fileSize: file.size,
        thumbName: thumbnail?.name,
        thumbType: thumbnail?.type,
        channel: user.channel.id,
      },
      { withCredentials: true }
    );

    const urlPresigned = res.data.videoUrl;
    console.log(file.type)

    // Aguarde a resposta do fetch
    const uploadResponse = await fetch(urlPresigned, {
      method: "PUT",
      headers: {
        "Content-Type": file.type, // Tipo do arquivo
      },
      body: file, // O arquivo que você deseja enviar
    });

    if (!uploadResponse.ok) {
      throw new Error("Erro ao enviar o vídeo");
    }

    console.log("Upload realizado com sucesso!");
  } catch (error) {
    console.log("Erro:", error);
  }
}