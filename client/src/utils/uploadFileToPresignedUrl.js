export default async function uploadFileToPresignedUrl(urlPresigned, file) {
    const uploadResponse = await fetch(urlPresigned, {
        method: "PUT",
        headers: {
            "Content-Type": file.type,
        },
        body: file,
    });

    if (!uploadResponse.ok) {
        throw new Error("Erro ao enviar o midia");
    }

    console.log("Upload realizado com sucesso!");
}