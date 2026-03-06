/*
  Warnings:

  - You are about to drop the column `userId` on the `OrdemStatusHistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrdemStatusHistory" DROP CONSTRAINT "OrdemStatusHistory_userId_fkey";

-- AlterTable
ALTER TABLE "OrdemStatusHistory" DROP COLUMN "userId";
