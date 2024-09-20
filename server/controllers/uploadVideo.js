import createVideoService from "../services/createVideoService.js";
import uploadFileToS3 from "../services/uploadVideoService.js";

export default async function uploadVideo(req, res) {
  const { file, fileName, title, thumbnail, thumbName, channel } = req.body;

  if (!title || !file) {
    return res
      .status(400)
      .send({ message: "Title and video file are required." });
  }
  const fileBuffer = Buffer.from(file, "base64");

  try {
    const videoUploadResponse = await uploadFileToS3(
      fileBuffer,
      fileName,
      "videos"
    );

    const newVideo = await createVideoService(
      title,
      thumbnail,
      videoUploadResponse,
      channel
    );

    console.log(newVideo);
    res.send(newVideo);
  } catch (error) {
    console.log(error.message);
  }
}
