import { getVideoService } from "../services/getVideoService.js";

export default async function getVideoId(req, res) {
  const { id } = req.params;

  const video = await getVideoService(id);

  res.send(video);
}
