/*
  Warnings:

  - You are about to drop the column `time` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the `RecordType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `departure` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_typeId_fkey";

-- DropIndex
DROP INDEX "Record_typeId_key";

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "time",
DROP COLUMN "typeId",
ADD COLUMN     "arrival" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "departure" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "RecordType";
