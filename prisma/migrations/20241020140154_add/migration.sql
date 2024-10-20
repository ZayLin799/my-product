/*
  Warnings:

  - Added the required column `createdBy` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `createdBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedBy` VARCHAR(191) NULL;
