/*
  Warnings:

  - You are about to drop the column `lastMessageTimeStamp` on the `chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chat" DROP COLUMN "lastMessageTimeStamp";

-- AlterTable
ALTER TABLE "message" ALTER COLUMN "timestamp" SET DEFAULT now();

-- AlterTable
ALTER TABLE "request" ALTER COLUMN "timestamp" SET DEFAULT now();

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT gen_random_uuid ( );
