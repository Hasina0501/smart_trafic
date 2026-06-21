/*
  Warnings:

  - Added the required column `distance` to the `Road` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Road" ADD COLUMN     "distance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "traffic" DOUBLE PRECISION NOT NULL DEFAULT 1;
