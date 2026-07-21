/*
  Warnings:

  - A unique constraint covering the columns `[entry_id]` on the table `correction_run` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entry_id` to the `correction_run` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "correction_run_user_id_created_at_idx";

-- AlterTable
ALTER TABLE "correction_run" ADD COLUMN     "entry_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "correction_run_entry_id_key" ON "correction_run"("entry_id");

-- CreateIndex
CREATE INDEX "correction_run_user_id_entry_id_created_at_idx" ON "correction_run"("user_id", "entry_id", "created_at");

-- AddForeignKey
ALTER TABLE "correction_run" ADD CONSTRAINT "correction_run_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "writing_entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
