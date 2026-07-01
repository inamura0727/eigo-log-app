/*
  Warnings:

  - A unique constraint covering the columns `[correction_run_id]` on the table `correction_item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[entry_id]` on the table `correction_run` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "correction_run_entry_id_created_at_idx";

-- CreateIndex
CREATE UNIQUE INDEX "correction_item_correction_run_id_key" ON "correction_item"("correction_run_id");

-- CreateIndex
CREATE UNIQUE INDEX "correction_run_entry_id_key" ON "correction_run"("entry_id");

-- CreateIndex
CREATE INDEX "correction_run_user_id_entry_id_created_at_idx" ON "correction_run"("user_id", "entry_id", "created_at");
