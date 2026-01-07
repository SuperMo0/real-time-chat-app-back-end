-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_lastMessageId_fkey";

-- AlterTable
ALTER TABLE "chat" ALTER COLUMN "lastMessageId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "message" ALTER COLUMN "timestamp" SET DEFAULT now();

-- AlterTable
ALTER TABLE "request" ALTER COLUMN "timestamp" SET DEFAULT now();

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT gen_random_uuid ( );

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_lastMessageId_fkey" FOREIGN KEY ("lastMessageId") REFERENCES "message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
