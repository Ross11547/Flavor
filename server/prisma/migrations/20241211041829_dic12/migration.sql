/*
  Warnings:

  - You are about to drop the column `StockMinimo` on the `producto` table. All the data in the column will be lost.
  - Added the required column `stockMinimo` to the `producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "detalleVenta" ALTER COLUMN "precioUnitario" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "producto" DROP COLUMN "StockMinimo",
ADD COLUMN     "stockMinimo" INTEGER NOT NULL,
ALTER COLUMN "precioVenta" SET DATA TYPE DOUBLE PRECISION;
