/*
  Warnings:

  - Added the required column `endLat` to the `Road` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endLng` to the `Road` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startLat` to the `Road` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startLng` to the `Road` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Road" ADD COLUMN     "endLat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "endLng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "startLat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "startLng" DOUBLE PRECISION NOT NULL;
