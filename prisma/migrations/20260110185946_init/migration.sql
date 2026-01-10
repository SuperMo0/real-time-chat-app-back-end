-- AlterTable
ALTER TABLE "message" ALTER COLUMN "timestamp" SET DEFAULT now();

-- AlterTable
ALTER TABLE "request" ALTER COLUMN "timestamp" SET DEFAULT now();

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT gen_random_uuid ( ),
ALTER COLUMN "avatar" SET DEFAULT 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png';
