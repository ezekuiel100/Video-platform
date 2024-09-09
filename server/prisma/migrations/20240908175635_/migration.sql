/*
  Warnings:

  - You are about to drop the column `subscribers` on the `Channel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN "dislike" INTEGER;
ALTER TABLE "Video" ADD COLUMN "like" INTEGER;

-- CreateTable
CREATE TABLE "Subscription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "channelId" TEXT NOT NULL,
    CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subscription_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Channel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "profileImage" TEXT DEFAULT '/src/image/profile.jpg',
    "description" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Channel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Channel" ("createAt", "description", "id", "name", "profileImage", "userId") SELECT "createAt", "description", "id", "name", "profileImage", "userId" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");
CREATE UNIQUE INDEX "Channel_userId_key" ON "Channel"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_channelId_key" ON "Subscription"("userId", "channelId");
