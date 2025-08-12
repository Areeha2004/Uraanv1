/*
  Warnings:

  - You are about to drop the column `message` on the `Collaboration` table. All the data in the column will be lost.
  - The `status` column on the `Collaboration` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `Collaboration` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CollaborationStatus" AS ENUM ('pending', 'accepted', 'declined', 'in_progress', 'completed', 'cancelled');

-- AlterTable
ALTER TABLE "Collaboration" DROP COLUMN "message",
ADD COLUMN     "budget" DOUBLE PRECISION,
ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "projectDescription" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "CollaborationStatus" NOT NULL DEFAULT 'pending';

-- CreateTable
CREATE TABLE "CollaboratorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "skills" TEXT[],
    "portfolio" TEXT[],
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewsCount" INTEGER NOT NULL DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "topRated" BOOLEAN NOT NULL DEFAULT false,
    "responseTime" TEXT NOT NULL,
    "startingPrice" TEXT NOT NULL,
    "location" TEXT,

    CONSTRAINT "CollaboratorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "collaborationId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CollaboratorProfile_userId_key" ON "CollaboratorProfile"("userId");

-- CreateIndex
CREATE INDEX "CollaboratorProfile_location_idx" ON "CollaboratorProfile"("location");

-- CreateIndex
CREATE INDEX "CollaboratorProfile_rating_idx" ON "CollaboratorProfile"("rating");

-- CreateIndex
CREATE UNIQUE INDEX "Review_collaborationId_key" ON "Review"("collaborationId");

-- CreateIndex
CREATE INDEX "Collaboration_requesterId_idx" ON "Collaboration"("requesterId");

-- CreateIndex
CREATE INDEX "Collaboration_receiverId_idx" ON "Collaboration"("receiverId");

-- AddForeignKey
ALTER TABLE "CollaboratorProfile" ADD CONSTRAINT "CollaboratorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_collaborationId_fkey" FOREIGN KEY ("collaborationId") REFERENCES "Collaboration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
