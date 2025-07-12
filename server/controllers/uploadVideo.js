import createVideoService from "../services/createVideoService.js";

export default async function uploadVideo(req, res) {
  const { title, fileName, fileType, fileSize, thumbName, thumbType } = req.body;
  const userId = req.user.userId

  if (!title && !fileName) {
    return res
      .status(400)
      .send({ message: "Title and video file are required." });
  }

  try {
    const response = await createVideoService(title, fileName, fileType, thumbName, thumbType, userId);

    return res.status(201).send(response);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "An error occurred while uploading the video." });
  }
}
