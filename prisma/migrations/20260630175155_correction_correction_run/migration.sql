/*
  Warnings:

  - Added the required column `user_id` to the `correction_run` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "correction_run" ADD COLUMN     "user_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "correction_run" ADD CONSTRAINT "correction_run_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
