-- AlterTable
ALTER TABLE "Nabor" ADD COLUMN     "price" DECIMAL(65,30) NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "oferta" BOOLEAN NOT NULL DEFAULT false;
