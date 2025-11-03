/*
  Warnings:

  - You are about to drop the column `name` on the `Accessories` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Andozalar` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Furnitures` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Nabor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Nabor` table. All the data in the column will be lost.
  - Added the required column `name_uz` to the `Accessories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_uz` to the `Andozalar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_uz` to the `Furnitures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accessories" DROP COLUMN "name",
ADD COLUMN     "name_en" TEXT,
ADD COLUMN     "name_ru" TEXT,
ADD COLUMN     "name_uz" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Andozalar" DROP COLUMN "name",
ADD COLUMN     "name_en" TEXT,
ADD COLUMN     "name_ru" TEXT,
ADD COLUMN     "name_uz" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Furnitures" DROP COLUMN "name",
ADD COLUMN     "name_en" TEXT,
ADD COLUMN     "name_ru" TEXT,
ADD COLUMN     "name_uz" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Nabor" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "description_en" TEXT,
ADD COLUMN     "description_ru" TEXT,
ADD COLUMN     "description_uz" TEXT,
ADD COLUMN     "name_en" TEXT,
ADD COLUMN     "name_ru" TEXT,
ADD COLUMN     "name_uz" TEXT;
