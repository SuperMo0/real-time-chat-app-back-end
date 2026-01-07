-- AlterTable
ALTER TABLE "chat" ADD COLUMN     "lastMessageTimeStamp" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "message" ALTER COLUMN "timestamp" SET DEFAULT now();

-- AlterTable
ALTER TABLE "request" ALTER COLUMN "timestamp" SET DEFAULT now();

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT gen_random_uuid ( );
