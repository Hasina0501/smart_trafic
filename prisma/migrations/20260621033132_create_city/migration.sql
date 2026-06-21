/*
  Warnings:

  - You are about to drop the column `imaegeUrl` on the `Incident` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "imaegeUrl",
ADD COLUMN     "imageUrl" TEXT;
