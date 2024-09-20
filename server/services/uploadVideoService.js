import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default async function uploadFileToS3(buffer, name, folder) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME, // Nome do bucket
    Key: `${folder}/${name}`, // Caminho no bucket
    Body: buffer, // Conteúdo do arquivo
    ContentType: folder === "videos" ? "video/mp4" : "image/jpeg", // Ajustar MIME conforme o tipo
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${folder}/${name}`;
}
