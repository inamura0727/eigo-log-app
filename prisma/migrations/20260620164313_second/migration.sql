-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
