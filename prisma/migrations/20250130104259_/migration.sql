/*
  Warnings:

  - You are about to drop the `CoverPlanParents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CoverPlanDogs` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[kennel,pairing]` on the table `coverplans` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pairing` to the `coverplans` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CoverPlanParents" DROP CONSTRAINT "CoverPlanParents_coverPlanId_fkey";

-- DropForeignKey
ALTER TABLE "CoverPlanParents" DROP CONSTRAINT "CoverPlanParents_dogId_fkey";

-- DropForeignKey
ALTER TABLE "_CoverPlanDogs" DROP CONSTRAINT "_CoverPlanDogs_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoverPlanDogs" DROP CONSTRAINT "_CoverPlanDogs_B_fkey";

-- AlterTable
ALTER TABLE "coverplans" ADD COLUMN     "pairing" TEXT NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "cover" DROP NOT NULL;

-- DropTable
DROP TABLE "CoverPlanParents";

-- DropTable
DROP TABLE "_CoverPlanDogs";

-- CreateIndex
CREATE UNIQUE INDEX "coverplans_kennel_pairing_key" ON "coverplans"("kennel", "pairing");
