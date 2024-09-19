import { createChannelService } from "../services/createChannelService.js";
import { updateProfileImageService } from "../services/updateProfileImageService.js";

export default async function createChannel(req, res) {
  const { userId, username, base64Image, imageFileName } = req.body;

  let profileImageURL;

  if (imageFileName) {
    profileImageURL = await updateProfileImageService(
      userId,
      base64Image,
      imageFileName
    );
  }

  try {
    const { message } = await createChannelService(
      username,
      userId,
      profileImageURL
    );

    res.status(200).send({ message });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}
