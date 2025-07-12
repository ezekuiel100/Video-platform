import { prisma } from "../lib/prisma.js";
import createPresignedUrl from "./createPresignedUrl.js"
import generateUniqueFileName from "./generateUniqueFileName.js";

export default async function createVideoService(
  title, fileName, fileType, thumbName, thumbType, userId
) {

  try {
    let uniqueThumbName
    const uniqueFileName = generateUniqueFileName(fileName)

    let thumbUrl = null
    const videoUrl = await createPresignedUrl(uniqueFileName, fileType);

    if (thumbName) {
      uniqueThumbName = generateUniqueFileName(thumbName)
      thumbUrl = await createPresignedUrl(uniqueThumbName, thumbType);
    }

    const baseUrl = `https://pub-bb2774a25cae4bb28b9032cb5d338770.r2.dev`

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { channel: { select: { id: true } } }
    })

    if (!user) {
      throw new Error(`Usuário com ID ${userId} não encontrado.`);
    }
    if (!user.channel) {
      throw new Error(`Usuário com ID ${userId} não possui um canal associado.`);
    }

    await prisma.video.create({
      data: {
        title,
        content: "",
        thumbnail: thumbName ? `${baseUrl}/thumbnail/${uniqueThumbName}` : "",
        url: `${baseUrl}/video/${uniqueFileName}`,
        channelId: user.channel.id,
      },
    });


    return { videoUrl, thumbUrl };
  } catch (error) {
    console.log("Erro ao criar video", error.message)
    return { error: error.message }
  }
}
