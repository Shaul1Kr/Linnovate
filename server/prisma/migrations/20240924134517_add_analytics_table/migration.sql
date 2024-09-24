/*
  Warnings:

  - You are about to drop the column `accessCounter` on the `Analytics` table. All the data in the column will be lost.
  - You are about to drop the column `lastAccessed` on the `Analytics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Analytics" DROP COLUMN "accessCounter",
DROP COLUMN "lastAccessed";
