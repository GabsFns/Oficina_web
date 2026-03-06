-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Status" ADD VALUE 'AGUARDANDO_APROVACAO_DIAGNOSTICO';
ALTER TYPE "Status" ADD VALUE 'AGUARDANDO_APROVACAO_ORCAMENTO';

-- CreateTable
CREATE TABLE "OrdemStatusHistory" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ordemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OrdemStatusHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrdemStatusHistory" ADD CONSTRAINT "OrdemStatusHistory_ordemId_fkey" FOREIGN KEY ("ordemId") REFERENCES "OrdemService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdemStatusHistory" ADD CONSTRAINT "OrdemStatusHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
