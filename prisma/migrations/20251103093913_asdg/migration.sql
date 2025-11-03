/*
  Warnings:

  - You are about to drop the column `description` on the `Materials` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Materials" DROP COLUMN "description",
ADD COLUMN     "description_en" TEXT,
ADD COLUMN     "description_ru" TEXT,
ADD COLUMN     "description_uz" TEXT;
