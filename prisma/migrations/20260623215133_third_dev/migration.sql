/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Target" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('grammar', 'expression', 'vocabulary');

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "writing_entrie" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "original_text" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "target" "Target" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "writing_entrie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "correction_run" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "entry_id" UUID NOT NULL,
    "source_text" TEXT NOT NULL,
    "corrected_text" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "correction_run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "correction_item" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "correction_run_id" UUID NOT NULL,
    "category" "Category" NOT NULL,
    "original" TEXT NOT NULL,
    "corrected" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "correction_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "correction_run_id" UUID NOT NULL,
    "question_text" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entry_tag" (
    "entry_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "entry_tag_pkey" PRIMARY KEY ("entry_id","tag_id")
);

-- CreateIndex
CREATE INDEX "writing_entrie_user_id_created_at_idx" ON "writing_entrie"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "correction_run_entry_id_created_at_idx" ON "correction_run"("entry_id", "created_at");

-- CreateIndex
CREATE INDEX "correction_item_correction_run_id_display_order_idx" ON "correction_item"("correction_run_id", "display_order");

-- CreateIndex
CREATE INDEX "question_correction_run_id_idx" ON "question"("correction_run_id");

-- CreateIndex
CREATE INDEX "entry_tag_entry_id_idx" ON "entry_tag"("entry_id");

-- CreateIndex
CREATE INDEX "entry_tag_tag_id_idx" ON "entry_tag"("tag_id");

-- AddForeignKey
ALTER TABLE "writing_entrie" ADD CONSTRAINT "writing_entrie_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_run" ADD CONSTRAINT "correction_run_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "writing_entrie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_item" ADD CONSTRAINT "correction_item_correction_run_id_fkey" FOREIGN KEY ("correction_run_id") REFERENCES "correction_run"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_correction_run_id_fkey" FOREIGN KEY ("correction_run_id") REFERENCES "correction_run"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entry_tag" ADD CONSTRAINT "entry_tag_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "writing_entrie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entry_tag" ADD CONSTRAINT "entry_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
