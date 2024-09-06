/*
  Warnings:

  - You are about to drop the column `profilePic` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `profilePic` on the `User` table. All the data in the column will be lost.

*/
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
    "subscribers" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Channel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Channel" ("createAt", "description", "id", "name", "subscribers", "userId") SELECT "createAt", "description", "id", "name", "subscribers", "userId" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");
CREATE UNIQUE INDEX "Channel_userId_key" ON "Channel"("userId");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profileImage" TEXT DEFAULT '/src/image/profile.jpg',
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT
);
INSERT INTO "new_User" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
