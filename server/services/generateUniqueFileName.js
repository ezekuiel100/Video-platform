import crypto from "crypto";

export default function generateUniqueFileName(fileName) {
    const fileExtension = fileName.split('.').pop();
    const hash = crypto.randomBytes(8).toString("hex");

    const sanitizedFileName = fileName
        .replace(/\s+/g, "_").split('.')
        .slice(0, -1)
        .join('.')
        .replace(/[^a-zA-Z0-9_\-.]/g, "");

    return `${hash}-${sanitizedFileName.substring(0, 10)}.${fileExtension}`;
}