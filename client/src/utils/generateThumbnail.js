export default async function generateThumbnail(file) {
    return new Promise((resolve, reject) => {
        const fileUrl = URL.createObjectURL(file);
        const video = document.createElement("video");

        video.src = fileUrl;
        video.crossOrigin = "anonymous";
        video.muted = true;
        video.playsInline = true;

        video.onloadedmetadata = () => {
            video.currentTime = Math.min(1, video.duration / 2);
        };

        video.onseeked = async () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                URL.revokeObjectURL(fileUrl); // liberar memória
                if (!blob) {
                    reject("Erro ao criar blob da thumbnail.");
                    return;
                }
                const thumbFile = new File([blob], "thumbnail.jpg", {
                    type: "image/jpeg",
                });
                resolve(thumbFile);
            }, "image/jpeg", 0.9);
        };

        video.onerror = () => {
            URL.revokeObjectURL(fileUrl);
            reject("Erro ao carregar vídeo.");
        };
    });
}
