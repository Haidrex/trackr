/*
  Warnings:

  - You are about to drop the column `firstame` on the `Worker` table. All the data in the column will be lost.
  - You are about to drop the column `lastnme` on the `Worker` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `Worker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Worker" DROP COLUMN "firstame",
DROP COLUMN "lastnme",
ADD COLUMN     "firstname" VARCHAR(50) NOT NULL,
ADD COLUMN     "lastname" VARCHAR(50) NOT NULL;
