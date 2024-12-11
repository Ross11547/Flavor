/*
  Warnings:

  - You are about to alter the column `precioUnitario` on the `insumo` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "insumo" ALTER COLUMN "precioUnitario" SET DATA TYPE DOUBLE PRECISION;
