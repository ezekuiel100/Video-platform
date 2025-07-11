import createPresignedUrl from "../services/createPresignedUrl.js";

export default async function getPrivateUrlController(req, reply) {
    const filePath = request.params["*"];

    if (!filePath) {
        console.log("Parâmetro filePath inválido");
        reply.status(400).send({ error: "Parâmetro filePath inválido" });
        return;
    }

    const url = await createPresignedUrl(filePath)

    reply.send({ url });

}