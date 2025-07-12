import { prisma } from "../lib/prisma.js";
import createPresignedUrl from "./createPresignedUrl.js"
import generateUniqueFileName from "./generateUniqueFileName.js";

export default async function createVideoService(
  title, fileName, fileType, thumbName, thumbType, channel
) {

  try {
    let uniqueThumbName
    const uniqueFileName = generateUniqueFileName(fileName)

    let thumbUrl
    const videoUrl = await createPresignedUrl(uniqueFileName, fileType);
    // console.log("URL Presigned gerada:", videoUrl)

    if (thumbName) {
      uniqueThumbName = generateUniqueFileName(thumbName)
      thumbUrl = await createPresignedUrl(uniqueThumbName, thumbType);
    }

    const baseUrl = `https://pub-bb2774a25cae4bb28b9032cb5d338770.r2.dev`

    await prisma.video.create({
      data: {
        title,
        content: "",
        thumbnail: thumbName ? `${baseUrl}/thumbnail/${uniqueThumbName}` : "",
        url: `${baseUrl}/video/${uniqueFileName}`,
        channelId: channel,
      },
    });


    return { videoUrl, thumbUrl };
  } catch (error) {
    console.log("Erro ao criar video", error.message)
  }
}
