/*
  Warnings:

  - You are about to drop the `PencilPoint` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PencilPoint" DROP CONSTRAINT "PencilPoint_shapeId_fkey";

-- AlterTable
ALTER TABLE "Shape" ADD COLUMN     "pencilPoints" JSONB;

-- DropTable
DROP TABLE "PencilPoint";
