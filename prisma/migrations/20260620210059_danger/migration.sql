-- CreateTable
CREATE TABLE "Road" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Road_pkey" PRIMARY KEY ("id")
);
