/*
  Warnings:

  - The values [public] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('attente', 'approuver', 'rejeter');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('admin', 'superadmin');
ALTER TABLE "public"."User" ALTER COLUMN "Role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "Role" TYPE "Role_new" USING ("Role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "User" ALTER COLUMN "Role" SET DEFAULT 'admin';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "Role" SET DEFAULT 'admin';

-- CreateTable
CREATE TABLE "RegistrationRequest" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'attente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegistrationRequest_pkey" PRIMARY KEY ("id")
);
