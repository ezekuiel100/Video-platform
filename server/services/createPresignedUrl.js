import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
    getSignedUrl,
} from "@aws-sdk/s3-request-presigner";

export default async function createPresignedUrl(bucketPath, ContentType) {
    if (
        !process.env.CLOUDFLARE_ENDPOINT ||
        !process.env.ACCESS_KEY ||
        !process.env.SECRET_KEY
    ) {
        throw new Error("Variáveis de ambiente não definidas.");
    }

    const client = new S3Client({
        region: "auto", endpoint: process.env.CLOUDFLARE_ENDPOINT,
        credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY,
        },
    });

    const Key = ContentType.startsWith("video/") ? `video/${bucketPath}` : `thumbnail/${bucketPath}`

    const command = new PutObjectCommand({ Bucket: "video-platform", Key: Key, ContentType });

    return getSignedUrl(client, command, { expiresIn: 3600 });
}