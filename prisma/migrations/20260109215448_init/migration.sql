-- AlterTable
ALTER TABLE "message" ADD COLUMN     "readAt" TIMESTAMP(3),
ALTER COLUMN "timestamp" SET DEFAULT now();

-- AlterTable
ALTER TABLE "request" ADD COLUMN     "isSeen" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "timestamp" SET DEFAULT now();

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT gen_random_uuid ( );
