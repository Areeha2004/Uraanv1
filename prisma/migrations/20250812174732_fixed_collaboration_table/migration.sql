-- DropIndex
DROP INDEX "Collaboration_receiverId_idx";

-- DropIndex
DROP INDEX "Collaboration_requesterId_idx";

-- AlterTable
ALTER TABLE "Collaboration" ADD COLUMN     "additionalInfo" TEXT,
ADD COLUMN     "contactMethod" TEXT,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "title" TEXT,
ALTER COLUMN "budget" SET DATA TYPE TEXT;
