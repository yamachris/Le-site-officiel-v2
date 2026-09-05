-- CreateTable
CREATE TABLE IF NOT EXISTS "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Admin_username_key" ON "Admin"("username");

-- Insert yamachris admin account
INSERT INTO "Admin" (username, password, role, "updatedAt")
VALUES ('yamachris', '$argon2id$v=19$m=65536,t=3,p=4$salut', 'admin', CURRENT_TIMESTAMP)
ON CONFLICT (username) DO NOTHING;
