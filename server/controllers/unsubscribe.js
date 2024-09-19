import unsubscribeService from "../services/unsubscibeService.js";

export default async function unsubscribe(req, res) {
  const { userId, channelId } = req.body;

  try {
    const { user } = await unsubscribeService(userId, channelId);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao desinscrever-se do canal" });
  }
}
