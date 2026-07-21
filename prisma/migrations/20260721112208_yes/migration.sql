/*
  Warnings:

  - You are about to drop the column `entry_id` on the `correction_run` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "correction_run" DROP CONSTRAINT "correction_run_entry_id_fkey";

-- DropIndex
DROP INDEX "correction_run_entry_id_key";

-- DropIndex
DROP INDEX "correction_run_user_id_entry_id_created_at_idx";

-- AlterTable
ALTER TABLE "correction_run" DROP COLUMN "entry_id";

-- CreateIndex
CREATE INDEX "correction_run_user_id_created_at_idx" ON "correction_run"("user_id", "created_at");
