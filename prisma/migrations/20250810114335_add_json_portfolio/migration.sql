/*
  Warnings:

  - Changed the type of `portfolio` on the `CollaboratorProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CollaboratorProfile" DROP COLUMN "portfolio",
ADD COLUMN     "portfolio" JSONB NOT NULL;
