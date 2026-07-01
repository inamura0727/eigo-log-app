/*
  Warnings:

  - You are about to drop the `writing_entrie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "correction_run" DROP CONSTRAINT "correction_run_entry_id_fkey";

-- DropForeignKey
ALTER TABLE "entry_tag" DROP CONSTRAINT "entry_tag_entry_id_fkey";

-- DropForeignKey
ALTER TABLE "writing_entrie" DROP CONSTRAINT "writing_entrie_user_id_fkey";

-- DropTable
DROP TABLE "writing_entrie";

-- CreateTable
CREATE TABLE "writing_entry" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "original_text" TEXT NOT NULL,
    "status" BOOLEAN,
    "target" "Target" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "writing_entrie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "writing_entrie_user_id_created_at_idx" ON "writing_entry"("user_id", "created_at");

-- AddForeignKey
ALTER TABLE "correction_run" ADD CONSTRAINT "correction_run_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "writing_entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entry_tag" ADD CONSTRAINT "entry_tag_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "writing_entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "writing_entry" ADD CONSTRAINT "writing_entrie_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
