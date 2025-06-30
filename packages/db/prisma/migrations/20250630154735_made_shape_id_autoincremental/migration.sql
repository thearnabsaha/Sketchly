/*
  Warnings:

  - Made the column `shapeId` on table `PencilPoint` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
CREATE SEQUENCE pencilpoint_shapeid_seq;
ALTER TABLE "PencilPoint" ALTER COLUMN "shapeId" SET NOT NULL,
ALTER COLUMN "shapeId" SET DEFAULT nextval('pencilpoint_shapeid_seq');
ALTER SEQUENCE pencilpoint_shapeid_seq OWNED BY "PencilPoint"."shapeId";
