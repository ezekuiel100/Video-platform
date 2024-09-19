import subscribeService from "../services/subscribeService.js";

export default async function subscribe(req, res) {
  const { userId, channelId } = req.body;

  try {
    const { user } = await subscribeService(userId, channelId);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao se inscrever no canal" });
  }
}
