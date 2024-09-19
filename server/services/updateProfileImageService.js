import { prisma } from "../lib/prisma.js";
import fs from "fs";
import path from "path";
import { __filename, __dirname } from "../utils/pathUtils.js";

export async function updateProfileImageService(
  userId,
  base64Image,
  imageFileName
) {
  let profileImagePath = path.resolve(
    __dirname,
    "../data/profileImage",
    imageFileName
  );

  await fs.promises.writeFile(profileImagePath, base64Image, {
    encoding: "base64",
  });

  const profileImageURL = `http://localhost:3000/data/profileImage/${imageFileName}`;

  await prisma.user.update({
    where: { id: userId },
    data: {
      profileImage: profileImageURL,
    },
    include: { channel: true },
  });

  return profileImageURL;
}
