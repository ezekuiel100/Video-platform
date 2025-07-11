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
    console.log("URL Presigned gerada:", videoUrl)

    if (thumbName) {
      uniqueThumbName = generateUniqueFileName(thumbName)
      thumbUrl = await createPresignedUrl(uniqueThumbName, thumbType);
    }

    const baseUrl = `https://aa6766c4dc5f1a33005c52f5f1f5c306.r2.cloudflarestorage.com/video-platform`

    await prisma.video.create({
      data: {
        title,
        content: "",
        thumbnail: thumbName ? `${baseUrl}/thumbnail/${uniqueThumbName}` : "",
        url: `${baseUrl}/videos/${uniqueFileName}`,
        channelId: channel,
      },
    });


    return { videoUrl, thumbUrl };
  } catch (error) {
    console.log("Erro ao criar video", error.message)
  }
}
