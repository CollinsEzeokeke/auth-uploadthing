/*
  Warnings:

  - Made the column `ipAddress` on table `session` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userAgent` on table `session` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "session" ALTER COLUMN "ipAddress" SET NOT NULL,
ALTER COLUMN "userAgent" SET NOT NULL;